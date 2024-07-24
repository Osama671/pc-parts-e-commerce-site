import { Router } from 'express'
import * as cartService from '../services/cart.service.js'

const router = Router()

router.get('/', async (req, resp) => {
  try {
    const userId = req.userId
    const cart = await cartService.getCart(userId)
    resp.json(cart)
  } catch (err) {
    resp.status(500).json({ error: err })
  }
})

router.post('/add', async (req, res) => {
  try {
    const userId = req.userId
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    if (!userId || !product_id || quantity === undefined) {
      return res
        .status(400)
        .json({ error: 'User ID, product ID, and quantity are required' })
    }

    const updatedCart = await cartService.addToCart(
      userId,
      product_id,
      quantity
    )
    res.json(updatedCart)
  } catch (err) {
    console.error('Error in POST /cart/add:', err)
    res.status(500).json({ error: 'Failed to add item to cart' })
  }
})

export default router
