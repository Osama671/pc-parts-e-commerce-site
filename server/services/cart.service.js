import * as cartRepository from '../repositories/cart.repository.js'

export async function getCart(userId) {
  const items = await cartRepository.getCart(userId)
  return items.map((item) => ({
    id: item._id,
    user_id: item.userId,
    product_id: item.product_id,
    quantity: item.quantity,
  }))
}

export async function addToCart(userId, product_id, quantity) {
  try {
    await cartRepository.addToCart(userId, product_id, quantity)
    return getCart(userId)
  } catch (error) {
    console.error('Error in cart service:', error)
    throw new Error('Failed to add item to cart')
  }
}
