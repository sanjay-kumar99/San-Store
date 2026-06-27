// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce-products",
    });
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

export default router;
