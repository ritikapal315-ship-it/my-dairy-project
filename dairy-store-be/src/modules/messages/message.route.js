const express = require("express");

const messageController = require("./message.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const adminMiddleware = require("../../middleware/admin.middleware");

const router = express.Router();

// Public: koi bhi sandesh bhej sakta hai (bina login ke)
router.post("/", messageController.createMessage);

// Sirf admin sandesh padh sakta hai
router.get("/", authMiddleware, adminMiddleware, messageController.getAllMessages);

module.exports = router;