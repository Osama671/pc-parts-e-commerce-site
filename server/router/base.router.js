import { Router } from 'express'
import productsRouter from './products.router.js'
import cartRouter from './cart.router.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import cors from 'cors'

const router = Router()
router.use(cors())
router.use(authMiddleware)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/*', (req, resp) => {
  resp.status(404).send('Not found')
})

export default router
