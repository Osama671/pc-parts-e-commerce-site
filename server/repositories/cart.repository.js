import { db } from './mongo.js'

const cartCollection = db.collection('cart')
cartCollection.createIndex('userId')

export async function getCart(userId) {
  return await cartCollection.find({ userId }).toArray()
}

export async function addToCart(userId, product_id, quantity) {
  const cartItem = await cartCollection.findOne({ userId, product_id })

  if (cartItem) {
    await cartCollection.updateOne(
      { userId, product_id },
      { $inc: { quantity: quantity } }
    )
  } else {
    await cartCollection.insertOne({ userId, product_id, quantity })
  }
}

export async function clearCart(userId) {
  await cartCollection.deleteMany({ userId })
}
