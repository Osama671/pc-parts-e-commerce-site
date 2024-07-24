import express from 'express'
import staticRouter from './router/static.js'
import baseRouter from './router/base.router.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.use('/api', baseRouter)

app.use(staticRouter)

export default app
