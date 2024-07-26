import * as ordersRepository from '../repositories/orders.repository.js'
import { clearCart, getCart } from './cart.service.js'

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
    let insertedOrder = await ordersRepository.insertOrder(userId, cartProducts)
    await clearCart(userId)

    return { orderId: insertedOrder.insertedId }
  } catch (error) {
    throw new Error(error.message)
  }
}
