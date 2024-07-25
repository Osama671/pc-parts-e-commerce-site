import express from 'express'
import staticRouter from './router/static.js'
import baseRouter from './router/base.router.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api', baseRouter)

app.use(staticRouter)

export default app
