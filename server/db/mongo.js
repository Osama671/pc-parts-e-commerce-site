import { MongoClient } from 'mongodb'
import { mongoUri } from '../confg.js'

const client = new MongoClient(mongoUri)

export const db = client.db('pc_shop')
