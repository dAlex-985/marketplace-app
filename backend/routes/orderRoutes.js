import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createOrder,
  getMyOrders,
  getMySales,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, createOrder);

router.route("/myOrders").get(protect, getMyOrders);

router.route("/mySales").get(protect, getMySales);

export default router;
