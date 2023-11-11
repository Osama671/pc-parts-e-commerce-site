var urlParams = new URLSearchParams(window.location.search)
var productID = parseInt(urlParams.get('id'))
function populateReview(reviewElement, username, rating, content) {
  $(reviewElement).find('.username').html(username)
  $(reviewElement)
    .find('.rating')
    .html('Rating: ' + rating)
  $(reviewElement).find('.content').html(content)
}

async function loadReview(reviews) {
  if (reviews.length === 0) {
    //!reviews didn't work smfh
    $('#reviews').append(
      "<p style='color: white;'> There are currently no reviews"
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
  var quantity = parseInt($('#quantity').val())
  cartService.addToCart(productID, quantity)
})

async function getProduct() {
  const product = await productService.getProduct(parseInt(productID))
  if (!product) {
    window.location.replace('/404')
  }

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
  loadReview(product.reviews)
}

getProduct()
