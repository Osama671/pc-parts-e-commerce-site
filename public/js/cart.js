$(document).ready(function () {
  if (cartService.isCartEmpty()) {
    window.location.href = '404.html'
  }
})
