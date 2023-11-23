async function getProduct(amount = 5) {
  //amount is how many products will load.
  debugger
  let productIds = []
  let totalProducts = await productService.getTotalProducts()

  for (let i = 0; i < amount; i++) {
    let randomId
    do {
      randomId = generateRandomID(totalProducts)
    } while (productIds.includes(randomId))
    productIds.push(generateRandomID(randomId))
  }
  productIds.forEach(async (element) => {
    let product = await productService.getProduct(parseInt(element))
    displayProducts(product)
  })
}

function generateRandomID(max) {
  return Math.floor(Math.random() * max)
}

async function displayProducts(products) {
  const productTemplate = await $.get('/components/featured-products.html')
  generateColumn(
    productTemplate,
    products.id,
    products.image,
    products.name,
    products.price
  )
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

getProduct()
