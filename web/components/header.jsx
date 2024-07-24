import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext.jsx'
import AuthContext from '../context/AuthContext.jsx'
import AuthModal from './AuthModal.jsx'

const Header = () => {
  const { cart } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false)

  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-light">
      <div className="container-fluid">
        <a className="navbar-brand text-light fs-4 fw-medium" href="/">
          PC SHOP
        </a>
        <div id="navbar-cart" className="me-4">
          {user ? (
            <>
              <a href="/cart" style={{ position: 'relative' }}>
                <i className="bi bi-cart2 text-light fs-2"></i>
                {cart.items.length > 0 ? (
                  <span
                    id="cart-count"
                    className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {cart.items.length}
                  </span>
                ) : (
                  <></>
                )}
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              >
                <i
                  className="bi bi-box-arrow-right text-light fs-2"
                  style={{ marginLeft: '20px' }}
                ></i>
              </a>
            </>
          ) : (
            <a
              onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
              }}
              href="#"
              style={{ position: 'relative' }}
            >
              <i className="bi bi-person-circle text-light fs-2"></i>
            </a>
          )}
          {showModal ? (
            <AuthModal show={showModal} handleClose={handleModalClose} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
