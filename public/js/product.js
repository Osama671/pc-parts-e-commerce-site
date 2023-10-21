function populateReview(reviewElement, username, rating, content) {
  $(reviewElement).find('.username').html(username)
  $(reviewElement)
    .find('.rating')
    .html('Rating: ' + rating)
  $(reviewElement).find('.content').html(content)
}

function loadReview(reviews) {
  $.get('/components/reviews.html', function (data) {
    reviews.forEach((review) => {
      const reviewElement = $.parseHTML(data)
      populateReview(
        reviewElement,
        review.username,
        review.rating,
        review.review
      )
      $('#reviews').append(reviewElement)
    })
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

async function getProduct() {
  var urlParams = new URLSearchParams(window.location.search)
  var productID = parseInt(urlParams.get('id'))
  const product = await productService.getProduct(parseInt(productID))
  renderProduct(product)
}

function renderProduct(product) {
  $('.product-title').text(product.name)
  $('.description-details').text(product.description)
  $('.product-image').attr('src', `./img/products/${product.id}.jpg`)
  $('.price').text(
    'C' +
      new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      }).format(product.price)
  )
  loadReview(product.reviews)
  // Expected output: "￥123,457"
}

getProduct()
