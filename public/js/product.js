var urlParams = new URLSearchParams(window.location.search)
var productID = parseInt(urlParams.get('id'))
var stockCount
function populateReview(reviewElement, username, rating, content) {
  $(reviewElement).find('.username').html(username)
  $(reviewElement)
    .find('.rating')
    .html('Rating: ' + rating)
  $(reviewElement).find('.content').html(content)
}

async function loadReview(reviews) {
  //!reviews didn't work smfh
  if (reviews.length === 0) {
    $('#reviews').append(
      "<p style='color: white;'> There are currently no reviews."
    )
    return
  }
  const template = await $.get('/components/reviews.html')
  reviews.forEach((review) => {
    const reviewElement = $.parseHTML(template)
    populateReview(reviewElement, review.username, review.rating, review.review)
    $('#reviews').append(reviewElement)
  })
}

$('.increaseQuantity').click(function (e) {
  e.preventDefault()
  var quantity = parseInt($('#quantity').val())
  if (quantity + 1 > stockCount) return
  $('#quantity').val(quantity + 1)
  if (quantity + 1 > 1) {
    $('.decreaseQuantity').prop('disabled', false)
  }
})

$('.decreaseQuantity').click(function (e) {
  e.preventDefault()
  var quantity = parseInt($('#quantity').val())
  if (quantity > 1) {
    $('#quantity').val(quantity - 1)
  }

  if (quantity === 1) {
    $(this).prop('disabled', true)
  }
})

$('.addToCart').click(async function (e) {
  e.preventDefault()
  if (stockCount === 0) {
    alert('Sorry, this item is currently out of stock')
    return
  }
  if (
    Number($('#quantity').val()) + cartService.getQuantity(productID) >
    stockCount
  ) {
    alert("You've bought the whole damn thing")
    return
  }
  var quantity = parseInt($('#quantity').val())
  cartService.addToCart(productID, quantity)
})

async function getProduct() {
  const product = await productService.getProduct(parseInt(productID))
  if (!product) {
    window.location.replace('/404')
  }
  stockCount = product.stock
  renderProduct(product)
}

function renderProduct(product) {
  $('.product-title').text(product.name)
  $('.description-details').text(product.description)
  $('.product-image').attr('src', product.image)
  $('.price').text(
    'C' +
      new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(product.price)
  )
  $('.stockCount').text(product.stock + ' left in stock')
  loadReview(product.reviews)
}

getProduct()
