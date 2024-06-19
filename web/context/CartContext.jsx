import { createContext, useEffect, useState } from 'react'
import Layout from '../components/layout.jsx'
import { getAuth } from '../utils/auth.js'

export const CartContext = createContext()

const CartContextComponent = () => {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const updateCart = (cart) => {
    setCart(cart)
    setCartCount(cart.length)
  }

  useEffect(() => {
    const headers = {
      Authorization: getAuth(),
    }
    fetch('https://fsdm-pc-shop-v1.georgevm.com/cart', { headers })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart)
        setCartCount(data.cart.length)
      })
  }, [])

  return (
    <CartContext.Provider value={{ cartCount, cart, updateCart }}>
      <Layout />
    </CartContext.Provider>
  )
}

export default CartContextComponent
