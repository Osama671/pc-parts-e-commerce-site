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
    let output = await $.ajax({
      url: 'http://127.0.0.1:5000/products/' + id, // Replace URL with the prod url
      type: 'GET',
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'GET request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    return output
  }

  async getProducts() {
    if (!this.products) {
      let output = await $.ajax({
        url: 'http://127.0.0.1:5000/products', // Replace URL with the prod url
        type: 'GET',
        success: () => {
          // Add success logic if any
        },
        error: function (_, status, error) {
          console.error(
            'GET request failed with status',
            status,
            'and error',
            error
          )
        },
      })
      this.products = output.products
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

  async getFeaturedProducts() {
    let output = await $.ajax({
      url: 'http://127.0.0.1:5000/products/featured', // Replace URL with the prod url
      type: 'GET',
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'GET request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    return output.products
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
