const cartService = require("./cart.service");

const getCart = async (req, res) => {
  try {
    const items = await cartService.getCart(req.user.id);
    res.status(200).json({ message: "Cart found", data: items });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const item = await cartService.addToCart(req.user.id, req.body);
    res.status(201).json({ message: "Added to cart", data: item });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const item = await cartService.updateQuantity(
      req.user.id,
      req.params.productId,
      req.body.quantity
    );
    res.status(200).json({ message: "Cart updated", data: item });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const item = await cartService.removeFromCart(req.user.id, req.params.productId);
    res.status(200).json({ message: "Removed from cart", data: item });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getCart, addToCart, updateQuantity, removeFromCart };