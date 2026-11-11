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

import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:token").patch(resetPassword);

router.route("/updatePassword").patch(protect, updatePassword);

router.route("/updateMe").patch(protect, updateMe);

router.route("/deleteMe").patch(protect, deleteMe);
router.route("/me").get(protect, getMe, getUser);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getUser)
  .patch(protect, restrictTo("admin"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

export default router;
