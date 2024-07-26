import productService from './product.service.js'
import userService from './user.service.js'

class CartService {
  cartItems = []

  url = 'https://fsdm-pc-shop-v1.georgevm.com/cart'

  async getCart() {
    try {
      const response = await fetch(`${this.url}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userService.getAuth(),
        },
        method: 'GET',
      })
      const data = await response.json()
      const products = []
      const productsPromises = data.cart.map(async (item, i) => {
        const product = await productService.getProduct(item.product_id)
        products.push({ ...data.cart[i], product })
      })
      await Promise.all(productsPromises)

      return products
    } catch (e) {
      throw new Error(e)
    }
  }

  async addToCart(id, quantity) {
    try {
      const response = await fetch(`${this.url}/add`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userService.getAuth(),
        },
        method: 'POST',
        body: JSON.stringify({
          product_id: id,
          quantity: quantity,
        }),
      })
      const data = await response.json()
      return data.cart
    } catch (e) {
      throw new Error(e)
    }
  }

  async setQuantity(id, quantity) {
    const response = await fetch(`${this.url}/cart/item/` + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userService.getAuth(),
      },
      method: 'POST',
      body: JSON.stringify({
        quantity: quantity,
      }),
    })

    return response.cart
  }

  async removeFromCart(id) {
    let response = await $.ajax({
      url: `${this.url}/cart/item/` + id, // Replace URL with the prod url
      type: 'DELETE',
      headers: {
        Authorization: userService.getAuth(),
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
    return this.cartItems
  }

  async emptyCart() {
    let response = await $.ajax({
      url: `${this.url}/cart`, // Replace URL with the prod url
      type: 'DELETE',
      headers: {
        Authorization: userService.getAuth(),
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
    return this.cartItems
  }

  async checkout() {
    let response = await $.ajax({
      url: `${this.url}/cart/checkout`, // Replace URL with the prod url
      type: 'POST',
      headers: {
        Authorization: userService.getAuth(),
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
    return response.order_id
  }

  async getOrder(orderID) {
    try {
      let response = await $.ajax({
        url: `${this.url}/order/` + orderID, // Replace URL with the prod url
        type: 'GET',
        headers: {
          Authorization: userService.getAuth(),
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
}

const cartService = new CartService()

export default cartService
