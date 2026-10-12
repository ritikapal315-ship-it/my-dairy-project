const userService = require("./user.service");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: "User created",
      data: user
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (Number(req.params.id) !== req.user.id) {
      return res.status(403).json({ message: "You can update only your own account" });
    }

    const user = await userService.updateUser(req.params.id, req.body);

    res.status(200).json({ message: "User updated", data: user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const findUserById = async (req, res) => {
  try {
    if (Number(req.params.id) !== req.user.id) {
      return res.status(403).json({ message: "You can view only your own account" });
    }

    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", data: user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createnewUser = async (req, res) => {
  try {
    const user = await userService.createnewUser(req.body);

    res.status(201).json({
      message: "User created",
      data: user
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    if (Number(req.params.id) !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own account" });
    }

    const user = await userService.deleteUserById(req.params.id);

    res.status(200).json({ message: "User deleted", data: user });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await userService.login(req.body);

    res.status(200).json({
      message: "Login successful",
      data: user,
      token: token
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  findUserById,
  createnewUser,
  login,
  deleteUserById
};