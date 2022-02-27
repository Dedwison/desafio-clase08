class ProductsApi {
  constructor() {
    this.products = [];
  }
  static idCount = 0;

  getAll() {
    return [...this.products];
  }

  getById(productId) {
    const searchedProduct = this.products.find(
      (product) => product.id === +productId
    );
    return searchedProduct || { error: `Producto con id ${id} no encontrado!` };
  }

  save(product) {
    const { title, price, thumbnail } = product;
    if (!title || !price || !thumbnail)
      return { error: "todos los campos son obligatorios" };
    if (price < 0 || isNaN(price))
      return { error: "Precio debe ser un número entero positivo" };
    const newProduct = {
      ...product,
      id: ++ProductsApi.idCount,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateById(productId, product) {
    const productIndex = this.products.findIndex(
      (producto) => producto.id === +productId
    );
    if (productIndex < 0)
      return { error: `Producto con id ${productId} no encontrado!` };
    this.products[productIndex] = { id: +productId, ...product };
    return this.products[productIndex];
  }

  deleteById(productId) {
    const productIndex = this.products.findIndex(
      (producto) => producto.id === +productId
    );
    if (productIndex < 0)
      return { error: `Producto con id ${productId} no encontrado!` };
    return this.products.splice(productIndex, 1);
  }
}

module.exports = ProductsApi;
