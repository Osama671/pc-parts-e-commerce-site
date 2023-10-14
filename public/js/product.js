const reviews = [
  {
    username: 'ayaya',
    rating: 3.5,
    content:
      "According to all laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because don't care what humans think is impsosible. Yellow, black. Yellow, black. Yellow, black. Yellow, black.",
  },
  { username: 'Wide_Putin', rating: 69, content: 'Big Strong Russian Man' },
  { username: 'WIDE_George', rating: 5, content: 'Discord Nitro Pro $69' },
]

function populateReview(reviewElement, username, rating, content) {
  $(reviewElement).find('.username').html(username)
  $(reviewElement)
    .find('.rating')
    .html('Rating: ' + rating)
  $(reviewElement).find('.content').html(content)
}

function loadReview() {
  $.get('/components/reviews.html', function (data) {
    reviews.forEach((review) => {
      const reviewElement = $.parseHTML(data)
      populateReview(
        reviewElement,
        review.username,
        review.rating,
        review.content
      )
      $('#reviews').append(reviewElement)
    })
  })
}
loadReview()

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
