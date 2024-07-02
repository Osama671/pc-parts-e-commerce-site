import { createContext, useEffect, useState } from 'react'
import Layout from '../components/layout.jsx'
import { getAuth } from '../utils/auth.js'

export const CartContext = createContext()

const CartContextComponent = () => {
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
      <Layout />
    </CartContext.Provider>
  )
}

export default CartContextComponent
