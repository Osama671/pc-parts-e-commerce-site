import * as express from 'express'
import { createReadStream } from 'node:fs'

const router = express.Router()

const staticFiles = express.static('dist', { extensions: ['html', 'htm'] })

router.use(staticFiles)

router.get('*', (req, res) => {
  res.header('Content-Type', 'text/html; charset=utf-8')
  createReadStream('dist/index.html').pipe(res)
})

export default router
