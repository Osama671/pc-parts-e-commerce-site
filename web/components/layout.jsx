import { Outlet } from 'react-router-dom'
import Header from './header.jsx'
import Footer from './footer.jsx'
import ToastMessage from './product/ToastMessage.jsx'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx'

const Layout = () => {
  const { setToastState, toastState } = useContext(CartContext)
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastMessage
        show={toastState.showToast}
        message={toastState.toastMessage}
        onClose={() => setToastState({ showToast: false, toastMessage: '' })}
      />
    </div>
  )
}

export default Layout
