const pool = require("../../database/db.js");

const getCart = async (userId) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.product_id, c.quantity,
            p.name, p.price, p.stock, p.description
     FROM cart_items c
     JOIN products p ON p.id = c.product_id
     WHERE c.user_id = $1
     ORDER BY c.id`,
    [userId]
  );
  return rows;
};

const addToCart = async (userId, productId, quantity) => {
  const { rows } = await pool.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
     RETURNING id, product_id, quantity`,
    [userId, productId, quantity]
  );
  return rows[0];
};

const updateQuantity = async (userId, productId, quantity) => {
  const { rows } = await pool.query(
    `UPDATE cart_items
     SET quantity = $3
     WHERE user_id = $1 AND product_id = $2
     RETURNING id, product_id, quantity`,
    [userId, productId, quantity]
  );
  return rows[0];
};

const removeFromCart = async (userId, productId) => {
  const { rows } = await pool.query(
    `DELETE FROM cart_items
     WHERE user_id = $1 AND product_id = $2
     RETURNING id, product_id`,
    [userId, productId]
  );
  return rows[0];
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart };