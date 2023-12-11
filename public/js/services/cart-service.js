class CartService {
  cartItems = []

  async getCartItems() {
    if (!this.cartItems.length) {
      let cartRes = await $.ajax({
        url: 'http://127.0.0.1:5000/cart', // Replace URL with the prod url
        type: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa(userService.getUser()),
          'Content-Type': 'application/json',
        },
        success: () => {
          // Add success logic if any
        },
        error: function (_, status, error) {
          console.error(
            'GET request failed with status',
            status,
            'and error',
            error
          )
        },
      })
      return cartRes.cart
    }
    return this.cartItems
  }

  async getCartProducts() {
    var items = await this.getCartItems()
    var fetchedProdcuts = []
    var promises = items.map(async (item) => {
      const product = await productService.getProduct(item.product_id)
      fetchedProdcuts.push(product)
    })
    await Promise.all(promises)
    return fetchedProdcuts
  }

  refreshCart() {
    this.updateCart()
    this.updateTotal()
  }

  async getCartItemsCount() {
    var cartCount = await this.getCartItems()
    return cartCount.length
  }

  async addToCart(id, quantity) {
    let response = await $.ajax({
      url: 'http://127.0.0.1:5000/cart/add', // Replace URL with the prod url
      type: 'POST',
      data: JSON.stringify({
        product_id: id,
        quantity: quantity,
      }),
      headers: {
        Authorization: 'Basic ' + btoa(userService.getUser()),
        'Content-Type': 'application/json',
      },
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'POST request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    this.cartItems = response.cart
    this.refreshCart()
  }

  async setQuantity(id, quantity) {
    let response = await $.ajax({
      url: 'http://127.0.0.1:5000/cart/item/' + id, // Replace URL with the prod url
      type: 'POST',
      data: JSON.stringify({
        quantity: quantity,
      }),
      headers: {
        Authorization: 'Basic ' + btoa(userService.getUser()),
        'Content-Type': 'application/json',
      },
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'POST request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    this.cartItems = response.cart
  }

  async removeFromCart(id) {
    let response = await $.ajax({
      url: 'http://127.0.0.1:5000/cart/item/' + id, // Replace URL with the prod url
      type: 'DELETE',
      headers: {
        Authorization: 'Basic ' + btoa(userService.getUser()),
        'Content-Type': 'application/json',
      },
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'DELETE request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    this.cartItems = response.cart
    this.refreshCart(true)
  }

  async emptyCart() {
    let response = await $.ajax({
      url: 'http://127.0.0.1:5000/cart', // Replace URL with the prod url
      type: 'DELETE',
      headers: {
        Authorization: 'Basic ' + btoa(userService.getUser()),
        'Content-Type': 'application/json',
      },
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'DELETE request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    this.cartItems = response.cart
    this.refreshCart(true)
  }

  async checkout() {
    let response = await $.ajax({
      url: 'http://127.0.0.1:5000/cart/checkout', // Replace URL with the prod url
      type: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(userService.getUser()),
        'Content-Type': 'application/json',
      },
      success: () => {
        // Add success logic if any
      },
      error: function (_, status, error) {
        console.error(
          'POST request failed with status',
          status,
          'and error',
          error
        )
      },
    })
    this.cartItems = []
    return response.order_id
  }

  async getOrder(orderID) {
    try {
      let response = await $.ajax({
        url: 'http://127.0.0.1:5000/order/' + orderID, // Replace URL with the prod url
        type: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa(userService.getUser()),
          'Content-Type': 'application/json',
        },
        success: () => {
          // Add success logic if any
        },
        error: function (_, status, error) {
          console.error(
            'POST request failed with status',
            status,
            'and error',
            error
          )
        },
      })
      return response.order
    } catch {
      return []
    }
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

  onUpdateTotal(fn) {
    document.addEventListener('updateTotal', fn)
  }

  async getQuantity(id) {
    var products = await this.getCartItems()
    if (products) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) return products[i].quantity
      }
    }
  }
}

let cartService = new CartService()
