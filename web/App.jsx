import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { FourOhFour } from './pages/404.jsx'
import { Home } from './pages/home.jsx'
import { Products } from './pages/Products.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <FourOhFour />,
  },
  {
    path: '/products',
    element: <Products />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
