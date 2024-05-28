import express from 'express'

const app = express()
const port = 8080

app.use(express.static('public', { extensions: ['html', 'htm'] }))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
