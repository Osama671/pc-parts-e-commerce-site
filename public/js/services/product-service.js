class ProductService {
  async findProducts(category = '', search = '') {
    let products = await $.getJSON('/api/products.json')
    let filters = []

    const CategoryFilter = function (category) {
      return (products) => products.category === category
    }

    const SearchFilter = function (search) {
      return (products) =>
        products.name.toLowerCase().includes(search.toLowerCase())
    }

    if (category) {
      filters.push(CategoryFilter(category))
    }

    if (search) {
      filters.push(SearchFilter(search))
    }

    for (let filter of filters) {
      products = products.filter(filter)
    }

    return products

    // if (category !== '' && search !== '') {
    //   //If category and search filters are present.
    //   products.forEach((product) => {
    //     if (
    //       category === product.category &&
    //       product.name.toLowerCase().includes(search.toLowerCase()) === true
    //     ) {
    //       filteredProducts.push(product)
    //     }
    //   })
    //   return filteredProducts
    // }

    // if (category !== '') {
    //   // If category is present, but not search filter.
    //   products.forEach((product) => {
    //     if (category === product.category) filteredProducts.push(product)
    //   })
    //   return filteredProducts
    // }

    // if (search !== '') {
    //   // If search filter is present, but not category.
    //   products.forEach((product) => {
    //     if (product.name.toLowerCase().includes(search.toLowerCase()))
    //       filteredProducts.push(product)
    //   })
    //   return filteredProducts
    // }
    // return products
  }
}

let productService = new ProductService()
