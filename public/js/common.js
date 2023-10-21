function setUpNavbar() {
  $.getScript('js/services/cart-service.js')
  $('header').load('/components/navbar.html', function () {
    var cartCount = cartService.getCartItemsCount()
    if (cartCount && $('#cartCount').length) {
      $('#cartCount').addClass('badge').text(cartCount)
    } else {
      $('#cartCount').removeClass('badge')
    }
  })

  // set CSS classes on header
  $('header').addClass('sticky-top nav-bar')

  // adjust navbar style on scroll
  $(window).scroll(function () {
    var $navbar = $('.nav-bar').children('.navbar')
    var scroll = $(window).scrollTop()
    if (scroll > 20) {
      $navbar.removeClass('bg-sup-dark').addClass('bg-sdown-dark')
    } else {
      $navbar.removeClass('bg-sdown-dark').addClass('bg-sup-dark')
    }
  })
}

setUpNavbar()
