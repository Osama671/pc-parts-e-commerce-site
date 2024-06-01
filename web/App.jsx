import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { FourOhFour } from './pages/404.jsx'
import { Home } from './pages/home.jsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <FourOhFour />,
  },
  {
    path: '/',
    element: <Home />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
