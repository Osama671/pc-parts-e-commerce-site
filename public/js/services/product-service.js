class ProductService {
  findProducts() {
    return $.getJSON('/api/products.json')
  }
  async getProduct(id) {
    var products = await $.getJSON('/api/products.json')
    return products.find((product) => product.id === id) || null
  }
  renderPrice(price) {
    const priceInDollars = price / 100
    return (
      'C' +
      new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(priceInDollars)
    )
  }
}

let productService = new ProductService()
