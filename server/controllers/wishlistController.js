import Wishlist from "../models/wishlistModel.js";

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const item = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id }).populate(
      "product",
      "name price images",
    ); // ⭐ THIS IS IMPORTANT

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
