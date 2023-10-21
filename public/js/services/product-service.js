class ProductService {
  async findProducts(category = '', search = '') {
    const products = await $.getJSON('/api/products.json')
    let filteredProducts = []

    if (category !== '' && search !== '') {
      //If category and search filters are present.
      products.forEach((product) => {
        if (
          category === product.category &&
          product.name.toLowerCase().includes(search.toLowerCase()) === true
        ) {
          filteredProducts.push(product)
        }
      })
      return filteredProducts
    }

    if (category !== '') {
      // If category is present, but not search filter.
      products.forEach((product) => {
        if (category === product.category) filteredProducts.push(product)
      })
      return filteredProducts
    }

    if (search !== '') {
      // If search filter is present, but not category.
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(search.toLowerCase()))
          filteredProducts.push(product)
      })
      return filteredProducts
    }
    return products
  }
}

let productService = new ProductService()
