const express = require("express");

const productController = require("./product.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

// Public (sab dekh sakte hain)
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected (token zaroori)
router.post("/", authMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;