const express = require("express");

const cartController = require("./cart.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware); // cart ke saare routes par token zaroori

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:productId", cartController.updateQuantity);
router.delete("/:productId", cartController.removeFromCart);

module.exports = router;