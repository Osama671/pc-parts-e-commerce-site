import express from 'express'
import staticRouter from './router/static.js'

const app = express()
const port = 8080

app.use(staticRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
