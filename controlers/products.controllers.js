const { ProductsApi } = require("../models/data/products.api");

const productos = new ProductsApi();

const getProductsController = (req, res) => {
  const { price, busqueda } = req.query;
  let respuestaProductos = productos.getAll();
  if (Object.keys(req.query).length) {
    if (precio) {
      if (isNaN(+price)) {
        return res.status(400).send("PrecioMaximo debe ser in número válido");
      }
      respuestaProductos = respuestaProductos.filter(
        (prod) => prod.price <= +price
      );
    }
    if (busqueda) {
      respuestaProductos = respuestaProductos.filter((prod) =>
        prod.title.toLowerCase().startWith(busqueda.toLowerCase())
      );
    }
  }
  return res.json(respuestaProductos);
};

const getProductsByIdController = (req, res) => {
  const { productId } = req.params;
  const product = productos.getById(productId);
  if (product.error) return res.status(400).send(product.error);
  return res.json(product);
};

const saveProductController = (req, res) => {
  const newProduct = productos.save(req.body);
  if (newProduct.error) return res.status(400).send(newProduct.error);
  return res.json(newProduct);
};

const updateProductController = (req, res) => {
  const {
    params: { productId },
  } = req;
  const productUpdated = productos.updateById(productId, req.body);
  if (productUpdated.error) return res.status(400).send(productUpdated.error);
  return res.json(productUpdated);
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  const productDeleted = productos.deleteById(productId);
  if (productDeleted.error) res.status(400).send(productDeleted.error);
  return res.json(productDeleted);
};

module.exports = {
  getProductsController,
  getProductsByIdController,
  saveProductController,
  updateProductController,
  deleteProductController,
};
