const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

//Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//get All products => /api/v1/products?keyword=somename
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4; //*for pagination
  const productCount = await Product.countDocuments(); //we will use it in fontend

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  //find gives all products from database
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

//Get single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //check if product doesn't exist
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update Product  => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  //we have assign product so use let not const
  let product = await Product.findById(req.params.id);

  //check if product doesn't exist
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //check if product doesn't exist
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is successfully removed",
  });
});
