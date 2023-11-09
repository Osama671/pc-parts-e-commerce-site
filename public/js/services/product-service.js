class ProductService {
  async findProducts(category = '', search = '') {
    let products = await $.getJSON('/api/products.json')

    if (category) {
      products = products.filter(function (product) {
        return product.category === category
      })
    }

    if (search) {
      products = products.filter(function (product) {
        return product.name.toLowerCase().includes(search)
      })
    }

    return products
  }
  async getProduct(id) {
    var products = await $.getJSON('/api/products.json')
    return products.find((product) => product.id === id) || null
  }
}

let productService = new ProductService()
