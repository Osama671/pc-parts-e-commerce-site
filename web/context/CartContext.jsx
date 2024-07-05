import { createContext, useEffect, useState } from 'react'
import { getAuth } from '../utils/auth.js'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
    length: 0,
  })
  const updateCart = (cart) => {
    setCart({
      products: cart,
      length: cart.length,
    })
  }

  useEffect(() => {
    const headers = {
      Authorization: getAuth(),
    }
    fetch('https://fsdm-pc-shop-v1.georgevm.com/cart', { headers })
      .then((response) => response.json())
      .then((data) => {
        updateCart(data.cart)
      })
  }, [])

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
