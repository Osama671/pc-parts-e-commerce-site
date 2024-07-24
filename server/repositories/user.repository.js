import { db } from './mongo.js'
import { ObjectId } from 'mongodb'

const userCollection = db.collection('users')
userCollection.createIndex('email')

export async function getUserByEmail(email) {
  try {
    return userCollection.findOne({ email })
  } catch (e) {
    throw new Error(e)
  }
}

export async function getUserById(id) {
  try {
    return userCollection.findOne({ _id: new ObjectId(id) })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export async function registerUser({ name, email, hashedPassword }) {
  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    return userCollection.insertOne({ email, password: hashedPassword, name })
  } catch (e) {
    throw new Error(e)
  }
}
