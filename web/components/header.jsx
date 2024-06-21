import { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx'

const Header = () => {
  const cartContext = useContext(CartContext)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-light">
      <div className="container-fluid">
        <a
          className="navbar-brand text-light fs-4 fw-medium"
          href="/v1/index.html"
        >
          PC SHOP
        </a>
        <div id="navbar-cart" className="me-4">
          <a href="/v1/cart.html" style={{ position: 'relative' }}>
            <i className="bi bi-cart2 text-light fs-2"></i>
            {cartContext.cartCount > 0 ? (
              <span
                id="cart-count"
                className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
              >
                {cartContext.cartCount}
              </span>
            ) : (
              <></>
            )}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
