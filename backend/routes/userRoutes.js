import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword/:token", resetPassword);

router.delete("/deleteTest", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sikeresen bejutottál mint admin",
  });
});

export default router;
