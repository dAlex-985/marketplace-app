import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "An order must belong to a product."],
    },
    buyer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "An order must have a buyer."],
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "An order must have a seller."],
    },
    price: {
      type: Number,
      required: [true, "An order must have a price snapshot."],
      min: [1, "Price must be at least 1."],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed", "cancelled"],
        message: "Status must be: pending, completed, or cancelled.",
      },
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

orderSchema.index({ buyer: 1 });
orderSchema.index({ seller: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
