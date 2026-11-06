import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  req.body.seller = req.user.id;

  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ status: "available" });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate({
    path: "seller",
    select: "name avatar email",
  });

  if (!product) {
    return next(new AppError("No product was found with that ID!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product with that ID was not found.", 404));
  }

  const isOwner = product.seller.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(
      new AppError("You do not have permission to edit this product.", 403),
    );
  }

  delete req.body.seller;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true, returnDocument: "after" },
  );

  res.status(200).json({
    status: "success",
    data: { product: updatedProduct },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  const isOwner = product.seller.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(
      new AppError("You do not have permission to delete this product.", 403),
    );
  }

  if (product.status !== "available") {
    return next(
      new AppError(
        "You cannot delete a product that is currently reserved or already sold.",
        400,
      ),
    );
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getMyProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ seller: req.user.id });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
