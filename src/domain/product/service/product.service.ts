import Product from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product: Product) =>
      product.changePrice((product.price * percentage) / 100 + product.price)
    );
  }
}
