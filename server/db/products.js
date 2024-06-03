import { db } from './mongo.js'
import fs from 'node:fs/promises'

const productsCollection = db.collection('products')
productsCollection.createIndex('id')

export async function seedProducts() {
  const products = JSON.parse(await fs.readFile('server/content/products.json'))

  for (const product of products) {
    console.log(`Seeding product ID ${product.id}`)
    await productsCollection.updateOne(
      { id: product.id },
      { $set: product },
      {
        upsert: true,
      }
    )
  }
}
