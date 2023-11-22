async function getRandomInt() {
  productService.getProductLength().then((num) => {
    getProduct(num)
  })
}

async function getProduct(num, amount = 4) {
  let productIds = []

  for (let i = 0; i < amount; i++) {
    productIds.push(generateRandomID(num))
    while (checkIfUnique(productIds)) {
      i--
      continue
    }
  }
  console.log(productIds)
  for (let i = 0; i < productIds.length; i++) {
    let product = await productService.getProduct(parseInt(productIds[i]))
    displayProducts(product)
  }
}

function generateRandomID(max) {
  return Math.floor(Math.random() * max)
}

function checkIfUnique(productIds) {
  let num
  for (let i = 0; i < productIds.length; i++) {
    num = productIds[i]
    for (let j = i + 1; j < productIds.length; j++) {
      if (productIds[i] === productIds[j]) return false
    }
  }
}

async function displayProducts(products) {
  const productTemplate = await $.get('/components/product-list.html')

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

getRandomInt()
