import { body, validationResult } from "express-validator";
export const validateSignUp = [
  // Kiểm tra fullName phải có ít nhất 3 ký tự
  body("fullName")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .withMessage(
      "Full name must be at least 6 characters, 1 UpperCase char, 1 Speacial Char"
    ),

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
      console.log("lỗi trong hàm validateSignUp: ", errors.array());
      // Nếu có lỗi, trả về response luôn, KHÔNG cần next(error)
      return res
        .status(400)
        .json({ success: false, errors: errors.array()[0].msg });
    }

    // Nếu không có lỗi, tiếp tục sang middleware tiếp theo
    next();
  },
];
