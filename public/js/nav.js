$(document).ready(function () {
  $(window).scroll(function () {
    var $navbar = $('.nav-bar').children('.navbar')
    var scroll = $(window).scrollTop()
    if (scroll > 20) {
      $navbar.removeClass('bg-sup-dark').addClass('bg-sdown-dark')
    } else {
      $navbar.removeClass('bg-sdown-dark').addClass('bg-sup-dark')
    }
  })
})
