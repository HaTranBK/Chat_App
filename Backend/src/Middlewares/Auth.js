import User from "../Models/user.model.js";
import ErrorHandler from "./ErrorMiddleware.js";

export const isUserAuthenticated = CatchAsyncError(async (req, res, next) => {
  console.log("cookie of user: ", req.cookies);
  const token = req.cookies.userToken;
  console.log("token user: ", token);
  if (!token) {
    return next(new ErrorHandler("User Is Not Authenticated !", 400));
  }

  //Nếu như token hợp lệ thì nó sẽ trả về payload tức data được mã hóa trong token đó.
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid!" });
    console.log("decoded data: ", decoded);
    const user = await User.findById(decoded.id).select("-password"); //không lấy password
    if (!user) return next(new ErrorHandler("User Not Found!", 404));
    req.user = user;
    next();
  });
});
