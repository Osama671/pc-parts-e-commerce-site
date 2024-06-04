import express from 'express'
import staticRouter from './router/static.js'
import { seedProducts } from './db/products.js'
import { isDev } from './confg.js'

seedProducts().catch((error) => {
  if (isDev) {
    return
  }

  throw error
})

const app = express()
const port = 8080

app.use(staticRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
