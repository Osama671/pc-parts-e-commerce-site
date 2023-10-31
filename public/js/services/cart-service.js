class CartService {
  getCartProducts() {
    return this.getCartItemsCount()
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  }

  saveCartProducts(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    this.updateCart()
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
    var cart = this.getCartProducts()
    var index = cart.findIndex((x) => x.id == id)
    if (index !== -1) {
      cart[index].quantity = cart[index].quantity + quantity
    } else {
      cart.push({ id, quantity })
    }
    this.saveCartProducts(cart)
  }

  updateCart() {
    document.dispatchEvent(new Event('cartUpdate'))
  }

  onUpdateCart(fn) {
    document.addEventListener('cartUpdate', fn)
  }
}

let cartService = new CartService()
