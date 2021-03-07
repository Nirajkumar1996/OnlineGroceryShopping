const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//Create new product route only admin can use
router.route("/admin/product/new").post(newProduct);

//get All products route
router.route("/products").get(getProducts);

//Get single product route
router.route("/product/:id").get(getSingleProduct);

//update or delete product route only admin can use
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
