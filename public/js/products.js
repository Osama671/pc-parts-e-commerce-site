const productsPerPage = 50
async function loadProducts(category = '', search = '', pageNumber = 1) {
  var productDetails = await productService.findProducts(
    category,
    search,
    pageNumber,
    productsPerPage
  )
  var products = productDetails.products
  setUpPagination(pageNumber, productDetails.totalPages)
  await displayProducts(products)
}

async function displayProducts(products) {
  const productTemplate = await $.get('/components/product-list.html')
  products.forEach((product) =>
    generateColumn(
      productTemplate,
      product.id,
      product.image,
      product.name,
      product.price
    )
  )
}

function getEventTarget(e) {
  e = e || window.event
  return e.target || e.srcElement
}

function setUpPagination(activePage, totalPages) {
  var url = new URL(window.location.href)

  $('#pagination_div .pagination').append(
    '<li class="page-item"> <a class="page-link" href="#" aria-label="Previous">&laquo;</a></li>'
  )
  for (let i = 0; i < totalPages; i++) {
    $('#pagination_div .pagination').append(
      `<li class="page-item"><a class="page-link" href="#" data-page="${
        i + 1
      }"> ${i + 1} </a></li>`
    )
  }

  $('#pagination_div .pagination').append(
    '<li class="page-item"> <a class="page-link" href="#" aria-label="Next">&raquo;</a></li>'
  )

  $('#pagination_div .pagination .page-item a')[activePage].setAttribute(
    'class',
    'page-link active'
  )

  $('#pagination_div .pagination .page-item a').click(function () {
    var target = getEventTarget(event)
    var requestedPageIndex = target.innerHTML.toString()
    if (window.location.href.includes('page'))
      var pageNumber = Number(url.searchParams.get('page'))
    else
      var pageNumber = $('#pagination_div .pagination a.active')
        .parent()
        .index()
    if (target.ariaLabel == 'Previous') {
      if (pageNumber == 1) url.searchParams.set('page', pageNumber)
      else url.searchParams.set('page', pageNumber - 1)
    } else if (target.ariaLabel == 'Next') {
      if (pageNumber == totalPages) url.searchParams.set('page', pageNumber)
      else url.searchParams.set('page', pageNumber + 1)
    } else {
      url.searchParams.set('page', requestedPageIndex.trim())
    }
    window.location.href = url.toString()
  })
}

function generateColumn(template, id, imgURL, Title, price) {
  const productList = $.parseHTML(template)
  $(productList).find('.image-placeholder').attr('src', imgURL)
  $(productList).find('.product-name').html(Title)
  $(productList)
    .find('.product-link')
    .each(function () {
      $(this).attr('href', `/product?id=${id}`)
    })
  $(productList).find('.product-price').text(productService.renderPrice(price))

  $('#products-list').append(productList)
}

function reloadWebpageWithFilters() {
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
  let page = parseInt(params.get('page') || '1')
  // Fetches products with the category and search filters
  loadProducts(category, search, page)
}

function onSubmit(e) {
  reloadWebpageWithFilters()
  return false
}

$('#form').submit(onSubmit)

retrieveFiltersFromURL()
