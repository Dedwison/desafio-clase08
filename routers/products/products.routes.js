const express = require("express");
const { products } = require("../../data/products");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ products });
});

router.get("/:productId", (req, res) => {
  const { producId } = req.params;
  const product = products.find((item) => item.id === +productId);
  if (!product) {
    return res.status(404).json({
      error: `producto no encontrado`,
    });
  }
  return res.json({ product });
});

router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail) {
    return res.status(400).json({ error: "Formato de cuerpo incorrecto" });
  }
  if (Object.keys(products).length > 0) {
    const newProduct = {
      id: products.length + 1,
      title,
      price,
      thumbnail,
    };
    products.push(newProduct);
    return res.json({ newProduct });
  }
  const newProduct = {
    id: 1,
    title,
    price,
    thumbnail,
  };
  products.push(newProduct);
  return res.json({ newProduct });
});

router.put("/:productid", (req, res) => {
  const { productId } = req.params;
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail) {
    return res.status(400).json({ error: "Formato de cuerpo incorrecto" });
  }
  const productIndex = products.findIndex(
    (product) => product.id === +productId
  );
  if (productIndex < 0)
    return res.status(404).json({
      error: `Producto con el id: ${productId} no encontrado!`,
    });
  const newProduct = {
    ...products[productIndex],
    title,
    price,
    thumbnail,
  };
  products[productIndex] = newProduct;
  return res.json({ newProduct });
});

router.delete("/:productid", (req, res) => {
  const { productId } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === +productId
  );
  if (productIndex < 0)
    return res.status(404).json({
      success: false,
      error: `Producto con el id: ${productId} no encontrado!`,
    });
  products.splice(productIndex, 1);
  return res.json({ result: "Producto eliminado correctamente" });
});

module.exports = router;
