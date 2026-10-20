const express = require("express");

const productController = require("./product.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/admin.middleware");

const router = express.Router();

// Public (sab dekh sakte hain)
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Sirf admin
router.post("/", authMiddleware, adminMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;