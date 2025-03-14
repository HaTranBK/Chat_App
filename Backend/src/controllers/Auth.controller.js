import { HttpStatusCode } from "axios";
import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorMiddleware.js";
import User from "../Models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const Login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please Provide All Details", 400));
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User Not Found", 404));
  const checkPassword = await user.comparePassword(password);
  console.log("result from check password: ", checkPassword);
  if (!checkPassword)
    return next(new ErrorHandler("Password Is Not Correct", 400));
  generateToken(user, "Login Successfully", HttpStatusCode.Accepted, res);
});

export const Logout = CatchAsyncError((req, res, next) => {
  res
    .status(HttpStatusCode.Accepted)
    .cookie("UserToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
    });
});

export const SignUp = CatchAsyncError(async (req, res, next) => {
  const { email, fullName, password } = req.body;
  console.log(req.body);
  if (!email || !fullName || !password) {
    return next(new ErrorHandler("Please Provide All Details !", 400));
  }
  const result = await User.findOne({
    email,
  });
  if (result) return next(new ErrorHandler("Email is already exist", 400));
  try {
    const user = await User.create(req.body);
    console.log("kết quả sau khi tạo User mới trong SignUp: " + user);
  } catch (error) {
    return new Promise((res, rej) => {
      rej({
        success: false,
        message: error.message,
      });
    });
  }
  res.json({
    success: true,
    message: "Sign Up Successfully!",
  });
});

export const UpdateProfile = CatchAsyncError((res, req, next) => {
  const { profilePic } = req.body;
  if (!profilePic)
    return next(new ErrorHandler("ProfilePic is required!", 401));
});

export const CheckAuth = CatchAsyncError((req, res, next) => {
  return res.status(200).json(req.user);
});
