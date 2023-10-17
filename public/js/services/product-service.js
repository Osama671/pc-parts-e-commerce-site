class ProductService {
  findProducts(callback) {
    return $.getJSON('../api/products.json').success()
  }
}

let productService = new ProductService()
