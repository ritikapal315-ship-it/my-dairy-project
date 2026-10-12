const orderService = require("./order.service");

const placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.user.id, req.body);
    res.status(201).json({ message: "Order placed", data: order });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
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
  cancelOrder
};