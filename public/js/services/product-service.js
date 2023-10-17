class ProductService {
  findProducts() {
    return $.getJSON('/api/products.json')
  }
}

let productService = new ProductService()
