import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  avatar: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: [8, "Password must be at least 8 characters long!"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match!",
    },
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// DOCUMENT MIDDLEWARE: password hashing before save:
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
