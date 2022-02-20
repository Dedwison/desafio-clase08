const express = require("express");
const productsRoutes = require("./products/products.routes");

const router = express.Router();

//middlewares
router.use(express.json);

//Routes
router.use("/products", productsRoutes);

module.exports = router;
