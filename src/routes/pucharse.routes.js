import express from "express";
import { createPurchase } from "../controllers/purchase.controller.js";
import { authValidation } from "../middlewares/authRouteValidation.js";

const router = express.Router();

router.post("/payment", authValidation, createPurchase);

export default router;