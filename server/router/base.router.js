import { Router } from 'express'
import productsRouter from './products.router.js'
import cartRouter from './cart.router.js'
import userRouter from './user.router.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import bodyParser from 'body-parser'
const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use('/auth', userRouter)
router.use('/products', productsRouter)
router.use(authMiddleware)
router.use('/cart', cartRouter)
router.use('/*', (req, resp) => {
  resp.status(404).send('Not found')
})

export default router
