import * as cartRepository from '../repositories/cart.repository.js'

export async function getCart(userId) {
  return await cartRepository.getCart(userId)
}

export async function addToCart(userId, product_id, quantity) {
  try {
    return await cartRepository.addToCart(userId, product_id, quantity)
  } catch (error) {
    console.error('Error in cart service:', error)
    throw new Error('Failed to add item to cart')
  }
}
