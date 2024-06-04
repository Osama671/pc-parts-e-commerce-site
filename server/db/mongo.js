import { MongoClient, MongoServerSelectionError } from 'mongodb'
import { isDev, mongoUri } from '../confg.js'
import process from 'node:process'

const client = new MongoClient(mongoUri)

process.on('uncaughtException', (error) => {
  if (error instanceof MongoServerSelectionError && isDev) {
    console.error('Error connecting to Mongo')
    console.error(error.message)
    return
  }

  throw error
})

export const db = client.db('pc_shop')
