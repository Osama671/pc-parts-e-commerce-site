import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import './css/common.css'
import { FourOhFour } from './pages/404.jsx'
import { Home } from './pages/home.jsx'
import Product from './pages/product.jsx'
import Cart from './pages/cart/cart.jsx'
import Layout from './components/layout.jsx'
import CartProvider from './context/CartContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '*',
        element: <FourOhFour />,
      },
    ],
  },
])

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
