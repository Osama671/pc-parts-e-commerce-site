class CartService {
  getCartProducts() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  getCartItemsCount() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).length
      : 0
  }
}

let cartService = new CartService()
