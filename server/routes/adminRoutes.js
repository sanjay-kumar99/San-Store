import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAdminStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", protect, admin, getAdminStats);

export default router;