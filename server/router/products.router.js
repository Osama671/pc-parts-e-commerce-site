import { Router } from 'express'
import * as productsService from '../services/product.service.js'

const router = Router()

router.get('/featured', async (req, resp) => {
  resp.json({
    products: await productsService.getFeatured(),
  })
})

router.get('/:product_id', async (req, resp) => {
  resp.json(await productsService.getProductById(req.params.product_id))
})

router.get('/', async (req, resp) => {
  resp.json(await productsService.searchProducts())
})

export default router
