const wishlistRepository = require("./wishlist.repository");
const productRepository = require("../products/product.repository");

const fail = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const parseProductId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw fail("Valid productId is required", 400);
  }
  return id;
};

const getWishlist = async (userId) => {
  return await wishlistRepository.getWishlist(userId);
};

const addToWishlist = async (userId, body) => {
  const productId = parseProductId(body.productId ?? body.product_id);

  const product = await productRepository.getProductById(productId);
  if (!product) throw fail("Product not found", 404);

  return await wishlistRepository.addToWishlist(userId, productId);
};

const removeFromWishlist = async (userId, productIdValue) => {
  const productId = parseProductId(productIdValue);

  const removed = await wishlistRepository.removeFromWishlist(userId, productId);
  if (!removed) throw fail("Item not in wishlist", 404);

  return removed;
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };