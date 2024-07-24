import { Router } from 'express'
import * as userService from '../services/user.service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../confg.js'

const router = Router()

router.post('/login', async (req, resp) => {
  try {
    const { email, password } = req.body

    try {
      const user = await userService.getUser(email)
      if (!user) {
        return resp.status(400).json({ message: 'Invalid credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return resp.status(400).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: '1h',
      })

      resp.json({ token, user: { name: user.name, email: user.email } })
    } catch (error) {
      resp.status(500).json({ message: 'Server error' })
    }
  } catch (err) {
    console.log(err)
    resp.status(500).json({ error: err })
  }
})

router.post('/register', async (req, resp) => {
  const { name, email, password } = req.body
  console.log(req.body)
  if (!req.body) {
    return resp.status(400).json({ message: 'Invalid data' })
  }
  try {
    const existingUser = await userService.getUser({ email })
    if (existingUser) {
      return resp.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await userService.registerUser({
      name,
      email,
      hashedPassword,
    })
    resp.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    resp.status(500).json({ message: error.message })
  }
})

export default router
