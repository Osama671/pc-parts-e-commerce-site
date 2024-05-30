import * as express from 'express'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'

const router = express.Router()

router.use(express.static('dist', { extensions: ['html', 'htm'] }))
router.use(express.static('public', { extensions: ['html', 'htm'] }))

const index = (await doesFileExist('dist/index.html'))
  ? 'dist/index.html'
  : 'server/index.html'

router.get('*', async (req, res) => {
  res.header('Content-Type', 'text/html; charset=utf-8')
  createReadStream(index).pipe(res)
})

async function doesFileExist(path) {
  try {
    return (await stat(path)).isFile()
  } catch (e) {
    return false
  }
}

export default router
