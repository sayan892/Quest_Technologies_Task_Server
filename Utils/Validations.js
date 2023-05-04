const { check } = require("express-validator");
exports.userSigninValidator = [
  check("username").notEmpty().withMessage("username is required").isLength({ min: 5 }).withMessage("Must be a valid username"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
];
exports.productValidator = [
  check('ProductName').notEmpty().withMessage('product name required'),
  check('Price').notEmpty().withMessage('Price is required').isNumeric().withMessage("Invalid price value"),
  check('Quantity').notEmpty().withMessage('Quantity is required').isNumeric().withMessage("Invalid qty Input"),
  check('Stock').notEmpty().withMessage("Stock is required").isNumeric().withMessage("Invalid stock input")
]