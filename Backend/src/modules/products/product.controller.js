const productService = require("./product.service");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ message: "Product created", data: product });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ message: "Products found", data: products });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ message: "Product found", data: product });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product updated", data: product });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted", data: product });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};