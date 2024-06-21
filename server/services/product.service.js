import fs from 'node:fs/promises'
import * as productsRepository from '../repositories/products.repository.js'

export async function getFeatured() {
  return []
}

export async function searchProducts() {
  return []
}

export async function getProductById(productId) {
  return productsRepository.getProductById(productId)
}

export async function getProducts(limit, skip) {
  return productsRepository.getProducts(limit, skip)
}

export async function seedProducts() {
  const products = JSON.parse(await fs.readFile('server/content/products.json'))

  console.log('Seeding products...')

  await productsRepository.updateProducts(products)

  console.log(`Seeded ${products.length} products`)
}
