import { useContext } from 'react'
import './cart.css'
import { CartContext } from '../../context/CartContext.jsx'

export function Cart() {
  const { cart, cartCount } = useContext(CartContext)

  console.log(cart)
  return (
    <>
      <div className="container title-container py-3">
        <h1>Your Cart</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <ul className="list-group cart-items">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item">
                  {/* Render each cart item here */}
                  {item.name} - {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          {cartCount > 0 && (
            <div className="col-12 col-md-4 cart-total">
              <div className="summary-container">
                <h3>Summary</h3>
                <hr style={{ color: 'white' }} />
                <table>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td className="subtotal">CD</td>
                    </tr>
                    <tr>
                      <td>Taxes</td>
                      <td className="taxes">CD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="checkout-container">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td className="total">CD</td>
                    </tr>
                  </tbody>
                </table>
                <div className="checkout">
                  <button className="btn btn-checkout" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {cartCount === 0 && (
        <div className="empty-cart-logo">
          <img src="/img/emptyCart.jpg" alt="empty-cart" />
          <div className="text-center">Your Cart is empty</div>
        </div>
      )}
    </>
  )
}
