function setUpNavbar() {
  // load navbar component
  $('header').load('/components/navbar.html')

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

  $(document).ready(function () {
    var cartCount = localStorage.getItem('cart')
    if (cartCount) {
      $('#cartCount').show()
      $('#cartCount').addClass('badge')
      $('#cartCount').text(JSON.parse(cartCount).length)
    } else {
      $('#cartCount').removeClass('badge')
      $('#cartCount').hide()
    }
  })
}
setUpNavbar()
