import * as userRepository from '../repositories/user.repository.js'

export async function registerUser({ name, email, hashedPassword }) {
  return userRepository.registerUser({ name, email, hashedPassword })
}

export async function getUser(email) {
  return userRepository.getUser(email)
}

export async function getUserById(id) {
  return userRepository.getUserById(id)
}
