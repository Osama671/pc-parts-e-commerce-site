async function loadProducts(category = '', search = '') {
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
  let searchValue = $('#search-input').val()
  if (!searchValue) {
    return
  } else {
    const url = new URL(window.location.href)
    url.searchParams.set('search', searchValue)
    window.location.href = url
  }
}

function retrieveFiltersFromURL() {
  // Retrieve category and search filters from the url
  let params = new URLSearchParams(document.location.search) // Fetches current URL
  let category = params.get('category') || '' // Stores the value from the url after "category=" and stops at & if present. If category isn't present, category = ''
  let search = params.get('search') || ''
  // Fetches products with the category and search filters
  loadProducts(category, search)
}

function onSubmit(e) {
  reloadWebpageWithFilters()
  return false
}

$('#form').submit(onSubmit)

retrieveFiltersFromURL()
