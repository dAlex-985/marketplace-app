import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("No product found with that Id", 404));
  }

  if (product.status !== "available") {
    return next(new AppError("Product not available with that ID", 400));
  }

  if (product.seller.toString() === req.user.id) {
    return next(new AppError("You cannot buy your own product.", 400));
  }

  const order = await Order.create({
    product: product._id,
    buyer: req.user.id,
    seller: product.seller,
    price: product.price,
  });

  product.status = "sold";

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ buyer: req.user.id }).populate({
    path: "product",
    select: "title price images",
  });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});
