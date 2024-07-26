import { clearCart } from '../services/cart.service.js'
import { db } from './mongo.js'

const ordersCollection = db.collection('orders')
ordersCollection.createIndex('orderId')

export async function checkout(userId, products) {
  try {
    let insertedOrder = await insertOrder(userId, products)
    await clearCart(userId)
    return { orderId: insertedOrder.insertedId }
  } catch (error) {
    throw new Error('Checkout failed')
  }
}

export async function insertOrder(userId, products) {
  return await ordersCollection.insertOne({
    userId: userId,
    products: products,
  })
}
