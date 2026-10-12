const wishlistService = require("./wishlist.service");

const getWishlist = async (req, res) => {
  try {
    const items = await wishlistService.getWishlist(req.user.id);
    res.status(200).json({ message: "Wishlist found", data: items });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const item = await wishlistService.addToWishlist(req.user.id, req.body);
    res.status(201).json({ message: "Added to wishlist", data: item });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const item = await wishlistService.removeFromWishlist(
      req.user.id,
      req.params.productId
    );
    res.status(200).json({ message: "Removed from wishlist", data: item });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };