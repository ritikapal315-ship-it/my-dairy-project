const productRepository = require("./product.repository");

const createProduct = async (data) => {
  const { name, price, stock } = data;

  if (!name || String(name).trim() === "") {
    const err = new Error("Product name is required");
    err.status = 400;
    throw err;
  }
  if (price === undefined || Number(price) < 0 || Number.isNaN(Number(price))) {
    const err = new Error("Price must be a number, 0 or more");
    err.status = 400;
    throw err;
  }
  if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
    const err = new Error("Stock must be a whole number, 0 or more");
    err.status = 400;
    throw err;
  }

  return await productRepository.createProduct(data);
};

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return product;
};

const updateProduct = async (id, data) => {
  const updated = await productRepository.updateProduct(id, data);
  if (!updated) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return updated;
};

const deleteProduct = async (id) => {
  const deleted = await productRepository.deleteProduct(id);
  if (!deleted) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return deleted;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};