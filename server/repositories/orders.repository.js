import { ObjectId } from 'mongodb'
import { db } from './mongo.js'

const ordersCollection = db.collection('orders')
const cartCollection = db.collection('cart')
ordersCollection.createIndex('orderId')

export async function checkout(userId) {
  const user = await ordersCollection.findOne({ userId })
  if (!user) console.error('User not found')

  if ((await cartCollection.findOne({ userId: userId })) === null) {
    return console.error('User has no items in their cart.')
  }

  try {
    const orderId = new ObjectId().toString()
    let newProducts = await cartCollection.find({ userId: userId }).toArray()

    newProducts.forEach((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
    }))
    await ordersCollection.insertOne({
      _id: orderId,
      userId: userId,
      products: newProducts,
    })
    await clearCartAfterCheckout(userId)
    return { orderId: orderId }
  } catch (error) {
    console.error('Error during checkout', error)
  }
}

async function clearCartAfterCheckout(userId) {
  try {
    return await cartCollection.deleteMany({ userId: userId })
  } catch (error) {
    console.error('Error deleting cart items', error)
  }
}
