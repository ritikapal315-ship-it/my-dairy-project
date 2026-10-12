const orderRepository = require("./order.repository");

const STATUSES = ["placed", "shipped", "delivered"];

const fail = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw fail("Valid order id is required", 400);
  }
  return id;
};

const placeOrder = async (userId, { address }) => {
  if (!address || String(address).trim() === "") {
    throw fail("Delivery address is required", 400);
  }

  return await orderRepository.createOrderFromCart(userId, String(address).trim());
};

const getMyOrders = async (userId) => {
  return await orderRepository.getOrdersByUser(userId);
};

const getAllOrders = async () => {
  return await orderRepository.getAllOrders();
};

const updateStatus = async (orderId, status) => {
  const id = parseId(orderId);

  if (!STATUSES.includes(status)) {
    throw fail(`Status must be one of: ${STATUSES.join(", ")}`, 400);
  }

  const updated = await orderRepository.updateOrderStatus(id, status);
  if (!updated) throw fail("Order not found or already cancelled", 404);

  return updated;
};

const cancelOrder = async (userId, orderId) => {
  const id = parseId(orderId);
  return await orderRepository.cancelOrder(userId, id);
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  cancelOrder
};