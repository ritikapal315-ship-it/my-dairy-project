const express = require("express");

const userController = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

// Public (bina login ke)
router.post("/create-user", userController.createUser);
router.post("/create-new-user", userController.createnewUser);
router.post("/login", userController.login);

// Protected (token zaroori)
router.put("/update-user/:id", authMiddleware, userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUserById);
router.delete("/delete-user-by-name/:name", authMiddleware, userController.deleteUserByName);
router.delete("/delete-user-by-limit/:limit", authMiddleware, userController.deleteUserByLimit);
router.get("/find-user/:id", authMiddleware, userController.findUserById);
router.get("/find-user-by-name/:name", authMiddleware, userController.finduserBYName);

module.exports = router;