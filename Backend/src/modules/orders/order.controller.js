
const orderService = require("./order.service");
const { sendMail } = require("../../utils/mailer");

const placeOrder = async (req, res) => {
  try {
    // Step 1: Pehle order successfully place hoga
    const order = await orderService.placeOrder(
      req.user.id,
      req.body
    );

    // Step 2: Order place hone ke baad confirmation email
    try {
      if (req.user.email) {
        const itemsHtml = order.items
          .map(
            (item) =>
              `<li>${item.name} - Quantity: ${item.quantity} - ₹${item.price}</li>`
          )
          .join("");

        await sendMail({
          to: req.user.email,
          subject: `FreshDairy Order Confirmation #${order.id}`,
          html: `
            <h2>Thank you for your order!</h2>

            <p>Hello ${req.user.name || "Customer"},</p>

            <p>Your FreshDairy order has been placed successfully.</p>

            <h3>Order Details</h3>

            <p>Order ID: ${order.id}</p>
            <p>Total Amount: ₹${order.total}</p>
            <p>Order Status: ${order.status}</p>

            <h3>Products</h3>
            <ul>${itemsHtml}</ul>

            <p>Thank you for shopping with FreshDairy!</p>
          `,
        });

        console.log("Order confirmation email sent");
      } else {
        console.log("Customer email not found in req.user");
      }
    } catch (mailError) {
      // Email fail hone par placed order ko fail nahi dikhana
      console.error("Order email failed:", mailError.message);
    }

    // Step 3: Frontend ko order response
    res.status(201).json({
      message: "Order placed",
      data: order,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.status(200).json({ message: "Orders found", data: orders });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ message: "All orders found", data: orders });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const order = await orderService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ message: "Order status updated", data: order });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrder(req.user.id, req.params.id);
    res.status(200).json({ message: "Order cancelled", data: order });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  cancelOrder,
};
