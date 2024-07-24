import { db } from './mongo.js'

const cartCollection = db.collection('cart')
cartCollection.createIndex('userId')

export async function getCart(userId) {
  const items = await cartCollection.find({ userId }).toArray()

  const formattedItems = items.map((item) => ({
    id: item._id,
    user_id: item.userId,
    product_id: item.product_id,
    quantity: item.quantity,
  }))

  return { cart: formattedItems }
}

export async function addToCart(userId, product_id, quantity) {
  try {
    const cartItem = await cartCollection.findOne({ userId, product_id })
    if (cartItem) {
      await cartCollection.updateOne(
        { userId, product_id },
        { $inc: { quantity: quantity } }
      )
    } else {
      await cartCollection.insertOne({ userId, product_id, quantity })
    }
    return await getCart(userId)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw new Error('Failed to add item to cart')
  }
}
