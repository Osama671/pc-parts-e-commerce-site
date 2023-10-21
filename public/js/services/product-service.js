class ProductService {
  findProducts() {
    return $.getJSON('/api/products.json')
  }
  async getProduct(id) {
    var json = await $.getJSON('/api/products.json')
    var out = json.filter((data) => {
      return data.id === id
    })
    return out[0]
  }
}

let productService = new ProductService()
