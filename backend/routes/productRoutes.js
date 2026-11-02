import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, createProduct);

router.route("/:id").get(getProduct);

router.route("/:id").patch(protect, updateProduct);

export default router;
