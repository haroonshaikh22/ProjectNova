import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Invalid Email Format"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is Required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3, max: 20 }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Required")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),

    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email Format"),
    body("password")
    .notEmpty()
    .withMessage("Password is Required"),
  ];
};

export { userRegisterValidator,userLoginValidator };
