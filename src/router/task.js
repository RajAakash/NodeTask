const express = require("express");
const router = new express.Router();
const {
  testPage,
  getAllProducts,
  postProduct,
  editProduct,
  updateProducts,
  deleteProducts,
} = require("../controller/task");

router.get("/test", testPage);

router.get("/", getAllProducts);

router.post("/", postProduct);

router.get("/edit/:id", editProduct);

router.post("/update", updateProducts);

router.get("/delete/:id", deleteProducts);

module.exports = router;
