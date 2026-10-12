const express = require("express");

const orderController = require("./order.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/admin.middleware");

const router = express.Router();

router.use(authMiddleware); // saare orders routes par token zaroori

// Customer
router.post("/", orderController.placeOrder);
router.get("/", orderController.getMyOrders);
router.put("/:id/cancel", orderController.cancelOrder);

// Sirf admin
router.get("/all", adminMiddleware, orderController.getAllOrders);
router.put("/:id/status", adminMiddleware, orderController.updateStatus);

module.exports = router;