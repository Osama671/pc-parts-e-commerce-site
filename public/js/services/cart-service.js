class CartService {
  getCartItems() {
    return this.getCartItemsCount()
      ? JSON.parse(localStorage.getItem('cart'))
      : []
  }

  async getCartProducts() {
    var items = this.getCartItems()
    var fetchedProdcuts = []
    var promises = items.map(async (item) => {
      const product = await productService.getProduct(item.id)
      fetchedProdcuts.push(product)
    })
    await Promise.all(promises)
    return fetchedProdcuts
  }

  saveCartProducts(cart, refreshCart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    if (refreshCart) {
      this.updateCart()
      this.updateTotal()
    }
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
    var cart = this.getCartItems()
    var index = cart.findIndex((x) => x.id == id)
    if (index !== -1) {
      cart[index].quantity = cart[index].quantity + quantity
    } else {
      cart.push({ id, quantity })
    }
    this.saveCartProducts(cart, true)
  }

  setQuantity(id, quantity) {
    var cart = this.getCartItems()
    var index = cart.findIndex((x) => x.id == id)
    if (index !== -1) {
      cart[index].quantity = quantity
    }
    this.saveCartProducts(cart, false)
  }

  removeFromCart(id) {
    var cart = this.getCartItems()
    var index = cart.findIndex((x) => x.id == id)
    if (index !== -1) {
      cart.splice(index, 1)
    }
    this.saveCartProducts(cart, true)
  }

  emptyCart() {
    this.saveCartProducts([], true)
  }

  updateCart() {
    document.dispatchEvent(new Event('cartUpdate'))
  }

  updateTotal() {
    document.dispatchEvent(new Event('updateTotal'))
  }

  onUpdateCart(fn) {
    document.addEventListener('cartUpdate', fn)
  }

  getQuantity(id) {
    let products = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) return products[i].quantity
    }
  }
}

let cartService = new CartService()
