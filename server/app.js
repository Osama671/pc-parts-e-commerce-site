import express from 'express'
import staticRouter from './router/static.js'
import productsRouter from './router/products.router.js'

const app = express()

app.use('/api/products', productsRouter)

app.use('/api/*', (req, resp) => {
  resp.status(404).send('Not found')
})

app.use(staticRouter)

export default app
