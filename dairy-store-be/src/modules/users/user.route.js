const express = require("express");

const userController = require("./user.controller");

const router = express.Router();

router.post("/create-user", userController.createUser);

router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUserById);
router.delete("/delete-user-by-name/:name", userController.deleteUserByName);
router.get("/find-user-by-name/:name", userController.finduserBYName);
router.delete("/delete-user-by-limit/:limit", userController.deleteUserByLimit);
router.get("/find-user/:id", userController.findUserById);
router.post("/create-new-user", userController.createnewUser);
router.post("/login", userController.login);
module.exports = router;