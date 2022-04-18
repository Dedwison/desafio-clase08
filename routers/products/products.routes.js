const express = require("express");
const {
  getProductsController,
  getProductsByIdController,
  saveProductController,
  updateProductController,
  deleteProductController,
} = require("../../controlers/products.controllers");

const router = express.Router();

router.get("/", getProductsController);

router.get("/:productId", getProductsByIdController);

router.post("/", saveProductController);

router.put("/:productId", updateProductController);

router.delete("/:productId", deleteProductController);

module.exports = router;
