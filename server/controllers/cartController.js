import Cart from "../models/Cart.js";

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({ userId: req.user.id, productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId: req.user.id,
        productId,
        quantity: quantity || 1,
      });
      await cartItem.save();
    }

    // ✅ सिर्फ updated item return करो
    const populatedItem = await cartItem.populate("productId");
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.user.id,
    }).populate("productId");

    // null product wale items hata do
    const validCart = cart.filter((item) => item.productId);

    // database se bhi delete kar do
    const invalidItems = cart.filter((item) => !item.productId);

    if (invalidItems.length > 0) {
      await Cart.deleteMany({
        _id: {
          $in: invalidItems.map((item) => item._id),
        },
      });
    }

    res.json(validCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update quantity
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  try {
    await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });

    // ✅ return updated cart
    const updatedCart = await Cart.find({ userId: req.user.id }).populate("productId");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    // ✅ return updated cart
    const updatedCart = await Cart.find({ userId: req.user.id }).populate("productId");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.json([]); // ✅ return empty cart array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
