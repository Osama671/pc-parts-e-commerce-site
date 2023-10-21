let currentLocation = ''
let searchTerm = ''

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

function getCurrentLocation() {
  let params = new URLSearchParams(document.location.search)
  let category = params.get('category')
  debugger
  let searchValue = String($('#search-input').val())
  if (category !== '' && searchValue === '') return
  if (category !== '' && searchValue !== '')
    location.href = `/products?category=${category}&search=${searchValue}`
  if (searchValue === '' && category === '') return
  if (searchValue !== '' && category === '')
    location.href = `/products?search=${searchTerm}`
}

function searchByCategory() {
  debugger
  let params = new URLSearchParams(document.location.search)
  let category = params.get('category') || ''
  let search = params.get('search') || ''
  console.log('category: ' + category)
  console.log('searchTerm: ' + searchTerm)
  console.log('currentLocation: ' + currentLocation)
  getProductResults(category, search)
}

function onSubmit(e) {
  getCurrentLocation()
  return false
}

$('#form').submit(onSubmit)

searchByCategory()
