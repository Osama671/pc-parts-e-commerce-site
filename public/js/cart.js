var cartAmount = 0
var products = []
function toDollars(price) {
  return (
    'C' +
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price)
  )
}

function populateCart(cartElement, product, quantity) {
  $(cartElement)
    .find('.product-link')
    .each(function () {
      $(this).attr('href', `/product?id=${product.id}`)
    })
  $(cartElement).find('.image-placeholder').attr('src', product.image)
  $(cartElement).find('.product-name').html(product.name)
  $(cartElement)
    .find('.item-price')
    .html(toDollars(product.price * quantity))
  $(cartElement).find('.quantity').attr('value', quantity)
  $(cartElement)
    .find('.remove-product')
    .click(() => {
      cartService.removeFromCart(product.id)
    })

  var increaseButton = $(cartElement).find('.increaseQuantity')
  var decreaseButton = $(cartElement).find('.decreaseQuantity')
  var quantityElem = $(cartElement).find('.quantity')

  if (quantity > 1) {
    decreaseButton.prop('disabled', false)
  }
  increaseButton.click(function (e) {
    e.preventDefault()
    var currentQuantity = parseInt(quantityElem.val())
    quantityElem.val(currentQuantity + 1)
    cartService.setQuantity(product.id, currentQuantity + 1)
    if (currentQuantity + 1 > 1) {
      decreaseButton.prop('disabled', false)
    }
    cartService.updateTotal()
  })

  decreaseButton.click(function (e) {
    e.preventDefault()
    var currentQuantity = parseInt(quantityElem.val())
    if (currentQuantity > 1) {
      quantityElem.val(currentQuantity - 1)
      cartService.setQuantity(product.id, currentQuantity - 1)
      if (quantityElem.val() == 1) {
        $(this).prop('disabled', true)
      }
    }
    cartService.updateTotal()
  })
}

async function renderCart() {
  const template = await $.get('/components/cart-items.html')
  products = await cartService.getCartProducts()
  var cart = await cartService.getCartItems()
  products.forEach((product, i) => {
    const cartElement = $.parseHTML(template)
    populateCart(cartElement, product, cart[i].quantity)
    $('.cart-items').append(cartElement)
  })
}

async function getCart() {
  $('.cart-items').html(' ')
  var cartCount = cartService.getCartItemsCount()
  if (!cartCount) {
    $('.cart-items').text('Your cart is empty')
  } else {
    await renderCart()
    cartService.updateTotal()
  }
}

function setTotal(subtotal, taxes, total) {
  $('.subtotal').html(toDollars(subtotal))
  $('.taxes').html(toDollars(taxes))
  $('.total').html(toDollars(total))
}

function updateTotal() {
  var cart = cartService.getCartItems()
  cartAmount = 0
  products.forEach((product, i) => {
    cartAmount += product.price * cart[i].quantity
  })
  var taxes = cartAmount * 0.13
  var totalAmount = cartAmount + taxes
  setTotal(cartAmount, taxes, totalAmount)
}

cartService.onUpdateTotal(() => {
  updateTotal()
})

cartService.onUpdateCart(() => {
  products = []
  getCart()
})
