import Product from "../models/productModel.js";

// @desc Get all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;

    const products = await Product.find({})
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      category,
      brand,
      countInStock,
    } = req.body;

    let images = [];
    let videos = [];

    if (req.files?.images) {
      images = req.files.images.map((file) => file.path);
    }

    if (req.files?.videos) {
      videos = req.files.videos.map((file) => file.path);
    }

    const product = new Product({
      name,
      description,
      price,
      oldPrice,
      category,
      brand,
      countInStock,
      images,
      videos,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price,oldPrice, category, brand, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.oldPrice = oldPrice || product.oldPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock || product.countInStock;

    // NEW IMAGES
    if (req.files?.images) {
      const newImages = req.files.images.map((file) => file.path);

      product.images = [...product.images, ...newImages];
    }

    // NEW VIDEOS
    if (req.files?.videos) {
      const newVideos = req.files.videos.map((file) => file.path);

      product.videos = [...product.videos, ...newVideos];
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
