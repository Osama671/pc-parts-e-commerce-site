class ProductService {
  async findProducts(category = '', search = '') {
    let products = await this.getProducts()

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
