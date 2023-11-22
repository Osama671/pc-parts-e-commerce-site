class PaginatedProducts {
  products = []
  productsPerPage
  pageNumber
  totalPages

  constructor(products, productsPerPage, pageNumber, totalPages) {
    this.products = products
    this.productsPerPage = productsPerPage
    this.pageNumber = pageNumber
    this.totalPages = totalPages
  }
}

class ProductService {
  async findProducts(category, search, pageNumber, productsPerPage) {
    let products = await this.getProducts()

    products = this.filterProducts(products, category, search)

    return this.paginateProducts(products, pageNumber, productsPerPage)
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

  paginateProducts(products, pageNumber, productsPerPage) {
    var startingIndex = (pageNumber - 1) * productsPerPage
    var totalPages = Math.ceil(products.length / productsPerPage)

    return new PaginatedProducts(
      products.slice(startingIndex, startingIndex + productsPerPage),
      productsPerPage,
      pageNumber,
      totalPages
    )
  }
}

let productService = new ProductService()
