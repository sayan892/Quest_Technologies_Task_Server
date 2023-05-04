const express = require("express");
const router = express.Router();
const { checkValidations } = require("../Utils/runvalidations");
const {
  productadd, productFetch, productupdate, productdelete
  } = require("../Controllers/productController");
const {
    productValidator
  } = require("../Utils/Validations"); 
router.post(
    `${process.env.PROD_ADD}`,
    productValidator,
    checkValidations,
    productadd
);
router.get(`${process.env.PROD_FETCH}`, productFetch);
router.put(`${process.env.PROD_UPDATE}`, productupdate)
router.delete(`${process.env.PROD_DELETE}`, productdelete);
module.exports = router;