import * as ordersRepository from '../repositories/orders.repository.js'
import { getCart } from './cart.service.js'

export async function checkout(userId) {
  try {
    let cartProducts = await getCart(userId)
    if (cartProducts.length === 0) {
      throw new Error('User has no items in their cart.')
    }

    cartProducts.forEach((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
    }))
    let orderId = ordersRepository.checkout(userId, cartProducts)
    return orderId
  } catch (error) {
    console.error('Error in POST /cart/checkout:', error.message)
  }
}
