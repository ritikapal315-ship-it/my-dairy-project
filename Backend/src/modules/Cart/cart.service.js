const cartRepository = require("./cart.repository");
const productRepository = require("../products/product.repository");

const fail = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const parseProductId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw fail("Valid product_id is required", 400);
  }
  return id;
};

const parseQuantity = (value) => {
  const qty = Number(value);
  if (!Number.isInteger(qty) || qty < 1) {
    throw fail("Quantity must be a whole number, 1 or more", 400);
  }
  return qty;
};

const getCart = async (userId) => {
  return await cartRepository.getCart(userId);
};

const addToCart = async (userId, { product_id, quantity }) => {
  const productId = parseProductId(product_id);
  const qty = parseQuantity(quantity === undefined ? 1 : quantity);

  const product = await productRepository.getProductById(productId);
  if (!product) throw fail("Product not found", 404);
  if (product.stock < qty) throw fail("Not enough stock", 400);

  return await cartRepository.addToCart(userId, productId, qty);
};

const updateQuantity = async (userId, productId, quantity) => {
  const pid = parseProductId(productId);
  const qty = parseQuantity(quantity);

  const product = await productRepository.getProductById(pid);
  if (!product) throw fail("Product not found", 404);
  if (product.stock < qty) throw fail("Not enough stock", 400);

  const updated = await cartRepository.updateQuantity(userId, pid, qty);
  if (!updated) throw fail("Item not in cart", 404);
  return updated;
};

const removeFromCart = async (userId, productId) => {
  const pid = parseProductId(productId);
  const removed = await cartRepository.removeFromCart(userId, pid);
  if (!removed) throw fail("Item not in cart", 404);
  return removed;
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart };