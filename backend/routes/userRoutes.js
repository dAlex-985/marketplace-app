import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from "../controllers/authController.js";

import { updateMe } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);

router.patch("/updateMe", protect, updateMe);

router.delete("/deleteTest", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sikeresen bejutottál mint admin",
  });
});

export default router;
