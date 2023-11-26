function renderItem(cartElement, product, quantity) {
  $(cartElement)
    .find('.product-link')
    .each(function () {
      $(this).attr('href', `/product?id=${product.id}`)
    })
  $(cartElement).find('.image-placeholder').attr('src', product.image)
  $(cartElement).find('.product-name').html(product.name)
  $(cartElement).find('.quantity').text(quantity)
  $(cartElement)
    .find('.item-price')
    .text(productService.renderPrice(product.price * quantity))
}

async function renderSummary() {
  const template = await $.get('/components/order-summary-item.html')
  products = await cartService.getCartProducts()

  if (products.length < 1) {
    location.replace('/404.html')
  }

  var cart = await cartService.getCartItems()
  $('.order-id').text(getRandomOrderId())
  products.forEach((product, i) => {
    const orderItemElement = $.parseHTML(template)
    renderItem(orderItemElement, product, cart[i].quantity)
    $('.order-items').append(orderItemElement)
  })
  cartService.emptyCart()
}

function getRandomOrderId() {
  // Function to generate a random capital letter
  function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  // Function to generate a random digit
  function getRandomDigit() {
    return Math.floor(Math.random() * 10)
  }

  return [
    ...Array(4).fill(null).map(getRandomDigit),
    ...Array(6).fill(null).map(getRandomLetter),
  ].join('')
}

renderSummary()
