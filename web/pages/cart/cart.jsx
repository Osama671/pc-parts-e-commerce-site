import './cart.css'
export function Cart() {
  return (
    <>
      <div className="container title-container py-3">
        <h1>Your Cart</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <ul className="list-group cart-items"></ul>
          </div>
          <div className="col-12 col-md-4 cart-total">
            <div className="summary-container">
              <h3>Summary</h3>
              <hr style={{ color: 'white' }} />
              <table>
                <tr>
                  <td>Subtotal</td>
                  <td className="subtotal">CD</td>
                </tr>
                <tr>
                  <td>Taxes</td>
                  <td className="taxes">CD</td>
                </tr>
              </table>
            </div>
            <div className="checkout-container">
              <table>
                <tr>
                  <td><strong>Total</strong></td>
                  <td className="total">CD</td>
                </tr>
              </table>
              <div className="checkout">
                <button
                  className="btn btn-checkout"
                  type="button"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="empty-cart-logo">
        <img src="/img/emptyCart.jpg" alt="empty-cart" />
        <div className="text-center">Your Cart is empty</div>
      </div>
    </>
  );
}
