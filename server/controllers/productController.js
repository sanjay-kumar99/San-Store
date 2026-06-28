import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    let products;

    if (search) {
      products = await Product.find({
        name: { $regex: search, $options: "i" },
      });
    } else {
      // 🔥 THIS WAS MISSING
      products = await Product.find({});
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   CREATE PRODUCT (FIXED)
========================= */
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

    // ---------- IMAGE UPLOAD ----------
    if (req.files?.images) {
      images = await Promise.all(
        req.files.images.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.v2.uploader
              .upload_stream(
                {
                  folder: "ecommerce-products",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result.secure_url);
                },
              )
              .end(file.buffer);
          });
        }),
      );
    }

    // ---------- VIDEO UPLOAD ----------
    if (req.files?.videos) {
      videos = await Promise.all(
        req.files.videos.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.v2.uploader
              .upload_stream(
                {
                  folder: "ecommerce-products",
                  resource_type: "video",
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result.secure_url);
                },
              )
              .end(file.buffer);
          });
        }),
      );
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
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE PRODUCT (FIXED)
========================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      category,
      brand,
      countInStock,
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.oldPrice = oldPrice || product.oldPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock || product.countInStock;

    // ---------- NEW IMAGES ----------
    if (req.files?.images) {
      const newImages = await Promise.all(
        req.files.images.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.v2.uploader
              .upload_stream(
                {
                  folder: "ecommerce-products",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result.secure_url);
                },
              )
              .end(file.buffer);
          });
        }),
      );

      product.images = [...product.images, ...newImages];
    }

    // ---------- NEW VIDEOS ----------
    if (req.files?.videos) {
      const newVideos = await Promise.all(
        req.files.videos.map((file) => {
          return new Promise((resolve, reject) => {
            cloudinary.v2.uploader
              .upload_stream(
                {
                  folder: "ecommerce-products",
                  resource_type: "video",
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result.secure_url);
                },
              )
              .end(file.buffer);
          });
        }),
      );

      product.videos = [...product.videos, ...newVideos];
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
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
