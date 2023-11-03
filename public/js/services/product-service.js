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
  }
}

let productService = new ProductService()
