class ProductsDetails {
  products = []
  productsPerPage
  pageNumber
  totalPages
  totalProducts

  constructor(
    products,
    productsPerPage,
    pageNumber,
    totalPages,
    totalProducts
  ) {
    ;(this.products = products),
      (this.productsPerPage = productsPerPage),
      (this.pageNumber = pageNumber),
      (this.totalPages = totalPages),
      (this.totalProducts = totalProducts)
  }
}
class ProductService {
  async findProducts(category, search, pageNumber, productsPerPage) {
    let products = await this.getProducts()

    products = this.filterProducts(products, category, search)

    var totalPages = Math.ceil(products.length / productsPerPage)

    if (pageNumber != null) {
      var startingIndex = (pageNumber - 1) * productsPerPage
      products = products.slice(startingIndex, startingIndex + productsPerPage)
    } else {
      pageNumber = 1
    }

    let productDetails = new ProductsDetails(
      products,
      productsPerPage,
      pageNumber,
      totalPages,
      products.length
    )
    return productDetails
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

  filterProducts(products, category = '', search = '') {
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
}

let productService = new ProductService()
