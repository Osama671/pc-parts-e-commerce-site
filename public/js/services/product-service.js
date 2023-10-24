class ProductService {
  findProducts() {
    return $.getJSON('/api/products.json')
  }
  async getProduct(id) {
    var products = await $.getJSON('/api/products.json')
    return products.find((product) => product.id === id) || null
  }
}

let productService = new ProductService()
