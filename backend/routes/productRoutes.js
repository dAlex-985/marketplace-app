import express from "express";
import { protect } from "../controllers/authController.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, createProduct);

router.route("/myProducts").get(protect, getMyProducts);

router.route("/:id").get(getProduct);

router.route("/:id").patch(protect, updateProduct);

router.route("/:id").delete(protect, deleteProduct);

export default router;
