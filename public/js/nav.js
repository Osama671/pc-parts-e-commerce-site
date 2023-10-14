$(document).ready(function () {
  var $navbar = $('.nav-bar')
  var $navbarInner = $navbar.find('.navbar')

  // Trigger this function every time the user scrolls
  $(window).scroll(function () {
    var scroll = $(window).scrollTop()

    if (scroll > 30) {
      $navbarInner.removeClass('bg-secondary-dark').addClass('bg-primary-dark')
    } else {
      $navbarInner.removeClass('bg-primary-dark').addClass('bg-secondary-dark')
    }
  })
})
