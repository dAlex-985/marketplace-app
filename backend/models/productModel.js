import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      trim: true,
      maxLength: [100, "A product title must have at most 100 characters."],
      minLength: [3, "A product title must have at least 3 characters."],
    },
    description: {
      type: String,
      required: [true, "A product must have a description."],
      trim: true,
      maxLength: [1000, "A description must have at most 1000 characters."],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price."],
      min: [1, "Price must be at least 1."],
    },
    size: {
      type: String,
      required: [true, "A product must have a size."],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "A product must have a condition specified."],
      enum: {
        values: [
          "new_with_tags",
          "new_without_tags",
          "very_good",
          "good",
          "satisfactory",
        ],
        message:
          "Condition must be: new_with_tags, new_without_tags, very_good, good, or satisfactory.",
      },
    },
    category: {
      type: String,
      required: [true, "A product must have a category."],
      enum: {
        values: ["women", "men", "kids", "accessories", "other"],
        message: ["Category must be: women, men, kids, accessories, or other."],
      },
      lowercase: true,
    },
    images: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length >= 1 && val.length <= 4;
        },
        message: "A product must have between 1 and 4 images.",
      },
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A product must belong to a seller."],
    },

    status: {
      type: String,
      enum: {
        values: ["available", "reserved", "sold"],
        message: "Status must be: available, reserved, or sold.",
      },
      default: "available",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.index({ price: 1, category: 1 });
productSchema.index({ seller: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
