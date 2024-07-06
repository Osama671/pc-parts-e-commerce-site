export class PaginatedProducts {
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

export class ProductService {
  url = 'https://fsdm-pc-shop-v1.georgevm.com'

  async findProducts(category, search, pageNumber, productsPerPage) {
    let products = await this.getProducts(pageNumber, category, search)

    return this.paginateProducts(products, pageNumber, productsPerPage)
  }

  async getProduct(id) {
    try {
      const response = await fetch(`${this.url}/products/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${id}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching product details:', error)
      return null
    }
  }

  async getProducts(pageNumber, category, search) {
    try {
      const response = await fetch(
        `${this.url}/products?pageNumber=${pageNumber}&category=${category}&search=${search}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching products:', error)
      return null
    }
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
    try {
      const response = await fetch(`${this.url}/products/featured`)
      if (!response.ok) {
        throw new Error('Failed to fetch featured products')
      }
      const data = await response.json()
      return data.products
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return null
    }
  }

  paginateProducts(products, pageNumber, productsPerPage) {
    var totalPages = products.total_pages

    return new PaginatedProducts(
      products.products,
      productsPerPage,
      pageNumber,
      totalPages
    )
  }
}

const productService = new ProductService()
export default productService
