class ProductService {
  async findProducts(category = '', search = '') {
    const products = await $.getJSON('/api/products.json')
    let filteredProducts = []

    if (category !== '' && search !== '') {
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
      products.forEach((product) => {
        if (category === product.category) filteredProducts.push(product)
      })
      return filteredProducts
    }

    if (search !== '') {
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
