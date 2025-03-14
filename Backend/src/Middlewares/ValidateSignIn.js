import { body, validationResult } from "express-validator";
export const validateSignIn = [
  // Kiểm tra fullName phải có ít nhất 3 ký tự

  // Kiểm tra email phải đúng định dạng
  body("email").isEmail().withMessage("Invalid email format"),

  // Kiểm tra password phải có ít nhất 6 ký tự
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // Middleware xử lý lỗi validation
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("lỗi trong hàm validateSignIn: ", errors.array());
      // Nếu có lỗi, trả về response luôn, KHÔNG cần next(error)
      return res
        .status(400)
        .json({ success: false, errors: errors.array()[0].msg });
    }

    // Nếu không có lỗi, tiếp tục sang middleware tiếp theo
    next();
  },
];
