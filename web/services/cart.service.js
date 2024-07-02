import ProductService from './product.service'

export const getCartProducts = async (cart) => {
  let totalPrice = 0
  for (const item of cart) {
    const product = await ProductService.getProduct(item.product_id)
    item.product = product
    totalPrice += product.price * item.quantity
  }
  cart.subTotal = totalPrice
  cart.taxes = totalPrice * 0.15
  cart.total = cart.subTotal + cart.taxes
  return cart
}

export default { getCartProducts }
