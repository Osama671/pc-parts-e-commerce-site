class CartService {
  getCartProducts() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  getCartItemsCount() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).length
      : 0
  }

  isCartEmpty() {
    return !localStorage.getItem('cart') ? true : false
  }

  addToCart(id, quantity) {
    if (this.isCartEmpty()) {
      localStorage.setItem('cart', JSON.stringify([{ id, quantity }]))
    } else {
      var cart = this.getCartProducts()
      var index = cart.findIndex((x) => x.id == id)
      if (index !== -1) {
        cart[index].quantity = cart[index].quantity + quantity
      } else {
        cart.push({ id, quantity })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    this.updateCart()
  }

  updateCart() {
    var cartCount = this.getCartItemsCount()
    if (cartCount) {
      $('#cart-count').show().text(cartCount)
    } else {
      $('#cartCount').hide()
    }
  }
}

let cartService = new CartService()
