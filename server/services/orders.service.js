import * as ordersRepository from '../repositories/orders.repository.js'

export async function checkout(userId) {
  try {
    const orderId = await ordersRepository.checkout(userId)
    return orderId
  } catch (error) {
    console.error('Error in POST /cart/add:', error)
  }
}
