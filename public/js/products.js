async function getProductResults(category = '', search = '') {
  const products = await productService.findProducts(category, search)
  const productTemplate = await $.get('/components/product-list.html')
  products.forEach((product) =>
    generateColumn(productTemplate, product.image, product.name)
  )
}

function generateColumn(template, imgURL, Title) {
  const productList = $.parseHTML(template)
  $(productList).find('.image-placeholder').attr('src', imgURL)
  $(productList).find('.product-name').html(Title)
  $('#products-list').append(productList)
}

function reloadWebpageWithFilters() {
  let params = new URLSearchParams(document.location.search)
  let category = params.get('category') || '' // If no category is present in the URL, category = ''
  let searchValue = String($('#search-input').val())
  if (category !== '' && searchValue === '') return // Since clicking on a category redirects to a pre-determiend URL (in the HTML <a>), this function will do nothing.
  if (category !== '' && searchValue !== '')
    location.href = `/products?category=${category}&search=${searchValue}`
  if (searchValue === '' && category === '') return
  if (searchValue !== '' && category === '')
    location.href = `/products?search=${searchValue}`
}

function retrieveFiltersFromURL() {
  // Retrieve category and search filters from the url
  let params = new URLSearchParams(document.location.search) // Fetches current URL
  let category = params.get('category') || '' // Stores the value from the url after "category=" and stops at & if present. If category isn't present, category = ''
  let search = params.get('search') || ''
  // Fetches products with the category and search filters
  getProductResults(category, search)
}

function onSubmit(e) {
  reloadWebpageWithFilters()
  return false
}

$('#form').submit(onSubmit)

retrieveFiltersFromURL()
