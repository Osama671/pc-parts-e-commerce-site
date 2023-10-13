var navbar = document.getElementsByClassName('nav-bar')[0]

// trigger this function every time the user scrolls
window.onscroll = function (event) {
  var scroll = window.pageYOffset

  if (scroll > 30) {
    navbar
      .querySelectorAll('.navbar')[0]
      .setAttribute('style', 'background-color:#212529 !important;')
  } else {
    navbar
      .querySelectorAll('.navbar')[0]
      .setAttribute('style', 'background-color:#2A2F35 !important;')
  }
}
