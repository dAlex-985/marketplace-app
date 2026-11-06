import express from "express";
import { protect } from "../controllers/authController.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.route("/createOrder").post(protect, createOrder);

router.route("/myOrders").get(protect, getMyOrders);

export default router;
