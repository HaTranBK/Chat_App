import jwt from "jsonwebtoken";
import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import User from "../Models/user.model.js";
import ErrorHandler from "../Middlewares/ErrorMiddleware.js";

export const isUserAuthenticated = CatchAsyncError(async (req, res, next) => {
  console.log("cookie of user: ", req.cookies);
  const token = req.cookies.UserToken;
  console.log("token user: ", token);
  if (!token) {
    return next(new ErrorHandler("User Is Not Authenticated !", 400));
  }

  //Nếu như token hợp lệ thì nó sẽ trả về payload tức data được mã hóa trong token đó.
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid!" });
    console.log("decoded data: ", decoded);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  });
});
