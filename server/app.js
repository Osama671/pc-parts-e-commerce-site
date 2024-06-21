import express from 'express'
import staticRouter from './router/static.js'
import productsRouter from './router/products.router.js'
import cartRouter from './router/cart.router.js'
import { authMiddleware } from './middleware/auth.middleware.js'
const app = express()

app.use(authMiddleware)

app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter)

app.use('/api/*', (req, resp) => {
  resp.status(404).send('Not found')
})

app.use(staticRouter)

export default app
