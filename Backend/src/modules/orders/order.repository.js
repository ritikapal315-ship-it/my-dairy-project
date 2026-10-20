const pool = require("../../database/db.js");

const fail = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

// Cart se order banao: sab kuch ek transaction mein
const createOrderFromCart = async (userId, address, paymentMethod) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows: items } = await client.query(
      `SELECT c.product_id, c.quantity, p.name, p.price, p.stock
       FROM cart_items c
       JOIN products p ON p.id = c.product_id
       WHERE c.user_id = $1
       ORDER BY p.id
       FOR UPDATE OF p`,
      [userId]
    );

    if (items.length === 0) throw fail("Cart is empty", 400);

    for (const item of items) {
      if (item.stock < item.quantity) {
        throw fail(`Not enough stock for ${item.name}`, 400);
      }
    }

    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    const { rows } = await client.query(
      `INSERT INTO orders (user_id, total, address, payment_method)
       VALUES ($1, $2, $3, $4)
       RETURNING id, total, address, status, payment_method, payment_status, created_at`,
      [userId, total.toFixed(2), address, paymentMethod]
    );
    const order = rows[0];

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.product_id, item.name, item.price, item.quantity]
      );

      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    await client.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

    await client.query("COMMIT");

    return {
      ...order,
      items: items.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getOrdersByUser = async (userId) => {
  const { rows } = await pool.query(
    `SELECT o.id, o.total, o.address, o.status,
            o.payment_method, o.payment_status, o.created_at,
            COALESCE(
              json_agg(
                json_build_object(
                  'product_id', i.product_id,
                  'name', i.name,
                  'price', i.price,
                  'quantity', i.quantity
                ) ORDER BY i.id
              ) FILTER (WHERE i.id IS NOT NULL),
              '[]'
            ) AS items
     FROM orders o
     LEFT JOIN order_items i ON i.order_id = o.id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.id DESC`,
    [userId]
  );
  return rows;
};

const getAllOrders = async () => {
  const { rows } = await pool.query(
    `SELECT o.id, o.user_id, u.name AS customer_name, u.email AS customer_email,
            o.total, o.address, o.status,
            o.payment_method, o.payment_status, o.created_at,
            COALESCE(
              json_agg(
                json_build_object(
                  'product_id', i.product_id,
                  'name', i.name,
                  'price', i.price,
                  'quantity', i.quantity
                ) ORDER BY i.id
              ) FILTER (WHERE i.id IS NOT NULL),
              '[]'
            ) AS items
     FROM orders o
     LEFT JOIN users u ON u.id = o.user_id
     LEFT JOIN order_items i ON i.order_id = o.id
     GROUP BY o.id, u.name, u.email
     ORDER BY o.id DESC`
  );
  return rows;
};

// Cancelled order ka status admin nahi badal sakta.
// COD order delivered hote hi paid ho jata hai (cash mil gaya).
const updateOrderStatus = async (orderId, status) => {
  const { rows } = await pool.query(
    `UPDATE orders
     SET status = $1::varchar,
         payment_status = CASE
           WHEN $1::varchar = 'delivered' AND payment_method = 'cod' THEN 'paid'
           ELSE payment_status
         END
     WHERE id = $2 AND status <> 'cancelled'
     RETURNING id, status, payment_status`,
    [status, orderId]
  );
  return rows[0];
};

// Customer apna placed order cancel kare, stock wapas aaye
const cancelOrder = async (userId, orderId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      "SELECT id, user_id, status FROM orders WHERE id = $1 FOR UPDATE",
      [orderId]
    );
    const order = rows[0];

    if (!order || order.user_id !== userId) {
      throw fail("Order not found", 404);
    }

    if (order.status !== "placed") {
      throw fail("Only placed orders can be cancelled", 400);
    }

    await client.query(
      `UPDATE products p
       SET stock = p.stock + i.quantity
       FROM order_items i
       WHERE i.order_id = $1 AND i.product_id = p.id`,
      [orderId]
    );

    const { rows: updated } = await client.query(
      "UPDATE orders SET status = 'cancelled' WHERE id = $1 RETURNING id, status",
      [orderId]
    );

    await client.query("COMMIT");
    return updated[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  createOrderFromCart,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
};