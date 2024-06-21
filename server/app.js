import express from 'express'
import staticRouter from './router/static.js'
import productsRouter from './router/products.router.js'
import cartRouter from './router/cart.router.js'

const app = express()

const authMiddleware = (req, resp, next) => {
  const token = req.headers.authorization
  if (token && token.split(' ')[0] === 'Basic') {
    req.userId = token.split(' ')[1]
    next()
  } else {
    resp.status(401).send('Unauthorized')
  }
}

app.use(authMiddleware)

app.use('/api/products', productsRouter)

app.use('/api/cart', cartRouter)

app.use('/api/*', (req, resp) => {
  resp.status(404).send('Not found')
})

app.use(staticRouter)

export default app
