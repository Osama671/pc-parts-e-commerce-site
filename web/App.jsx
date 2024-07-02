import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import './css/common.css'
import { FourOhFour } from './pages/404.jsx'
import { Home } from './pages/home.jsx'
import Cart from './pages/cart/cart.jsx'
import CartContextComponent from './context/CartContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CartContextComponent />,
    children: [
      {
        path: '/',
        element: <Home />,
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
  return <RouterProvider router={router} />
}

export default App
