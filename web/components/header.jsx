const Header = () => {
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
            <span
              id="cart-count"
              style={{ display: 'none' }}
              className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
            >
              0
            </span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
