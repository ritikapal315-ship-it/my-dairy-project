const express = require("express");

const userController = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

// Public (bina login ke)
router.post("/create-user", userController.createUser);
router.post("/create-new-user", userController.createnewUser);
router.post("/login", userController.login);

// Protected (token zaroori, sirf apna account)
router.get("/find-user/:id", authMiddleware, userController.findUserById);
router.put("/update-user/:id", authMiddleware, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUserById);

module.exports = router;