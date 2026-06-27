import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Public routes (anyone can read products)
router.get("/", getProducts);

// ✅ Category route को id से ऊपर रखो
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") }, // case-insensitive
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

router.get("/:id", getProductById);

// Protected routes (admin only)
router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  createProduct,
);
router.put(
  "/:id",
  protect,
  admin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
  updateProduct,
);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
