const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//* Register a user  => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "niraj1",
      url: "url1",
    },
  });

  //getting token while creating
  const token = user.getJwtToken();

  //sending token
  res.status(201).json({
    success: true,
    user,
    token,
  });
});

//Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //Finding user in DB
  //why used select method because we specified select:flase in User schema
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    //401 means unauthenticated user
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //checks if password is correct or not , comparePassword in user model
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
