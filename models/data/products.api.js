class ProductsApi {
  constructor() {
    this.products = [
      {
        id: 1,
        title: "pantalon",
        price: 3500,
        thumbnail: "http://image.jpg",
      },
    ];
  }
  static idCount = 1;

  getAll() {
    return [...this.products];
  }

  getById(productId) {
    const searchedProduct = this.products.findIndex(
      (product) => product.id === +productId
    );

    if (!searchedProduct) {
      return { error: `Producto con id ${productId} no encontrado!` };
    }

    return searchedProduct;
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
    const productIndex = this.products.find(
      (producto) => producto.id === +productId
    );
    console.log(productIndex);
    console.log(+productId);
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

module.exports = { ProductsApi };
