const express = require("express");
const router = express.Router();
const { checkValidations } = require("../Utils/runvalidations");
const {
 login
  } = require("../Controllers/productController");
const {
    userSigninValidator,
  } = require("../Utils/Validations"); 
router.post(
    `${process.env.SIGNIN_ROUTE}`,
    userSigninValidator,
    checkValidations,
    login
);
module.exports = router;