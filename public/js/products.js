console.log(productService)

function getProductResults() {
  function callback(products) {
    products.forEach((product) => {
      generateColumn(product.image, product.name)
    })
  }

  productService.findProducts(callback)
}

function generateColumn(imgURL, Title) {
  $.get('/components/product-list.html', function (data) {
    const productList = $.parseHTML(data)
    $(productList).find('.image-placeholder').attr('src', imgURL)
    $(productList).find('.product-name').html(Title)

    $('#products-list').append(productList)
  })
}
