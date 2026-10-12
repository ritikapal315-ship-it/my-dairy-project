
const express = require("express");
const router = express.Router();

const wishlistController = require("./wishlist.controller");

// Apne existing JWT middleware ka correct path yahan use karo.
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, wishlistController.addToWishlist);
router.get("/", authMiddleware, wishlistController.getWishlist);
router.delete("/:productId", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
