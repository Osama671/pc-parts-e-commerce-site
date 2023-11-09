class ProductService {
  findProducts() {
    return this.getProducts()
  }

  async getProduct(id) {
    var products = await this.getProducts()
    return products.find((product) => product.id === id) || null
  }

  async getProducts() {
    if (!this.products) {
      this.products = await $.getJSON('/api/products.json')
    }

    return this.products
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
