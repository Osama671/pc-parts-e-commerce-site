async function getProductResults() {
  const products = await productService.findProducts()
  const productTemplate = await $.get('/components/product-list.html')
  products.forEach((product) =>
    generateColumn(productTemplate, product.id, product.image, product.name)
  )
}

function generateColumn(template, id, imgURL, Title) {
  const productList = $.parseHTML(template)
  $(productList).find('.image-placeholder').attr('src', imgURL)
  $(productList).find('.product-name').html(Title)
  $(productList).find('.product-link').attr('href', `/product?id=${id}`)

  $('#products-list').append(productList)
}

getProductResults()
