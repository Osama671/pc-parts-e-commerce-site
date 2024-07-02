import { useContext, useEffect, useState } from 'react'
import './cart.css'
import { CartContext } from '../../context/CartContext.jsx'
import Loader from '../../components/loader.jsx'
import cartService from '../../services/cart.service.js'
import { parsePrice } from '../../utils/currency.js'

const CartItem = ({ product }) => {
  const item = product.product
  const quantity = product.quantity
  return (
    <li className="product-item list-group-item d-flex justify-content-between align-items-center">
      <div className="product-details">
        <div className="d-flex justify-content-between align-items-center">
          <img src={item.image} className="image-placeholder" />
          <div className="product">
            <a className="product-link" href={`/product/${item.id}`}>
              <p className="product-name">{item.name}</p>
            </a>

            <div className="quantity-selector">
              <div className="stockButton stockButton-filled">
                <button className="increaseQuantity">+</button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  disabled
                  min="1"
                />
                <button className="decreaseQuantity" disabled>
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
        <i className="bi bi-x remove-product"></i>
        <div className="item-price">{parsePrice(item.price * quantity)}</div>
      </div>
    </li>
  )
}

const Summary = ({ cartProducts }) => {
  return (
    <div className="col-12 col-md-4 cart-total">
      <div className="summary-container">
        <h3>Summary</h3>
        <hr style={{ color: 'white' }} />
        <table>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="subtotal">{parsePrice(cartProducts.subTotal)}</td>
            </tr>
            <tr>
              <td>Taxes</td>
              <td className="taxes">{parsePrice(cartProducts.taxes)}</td>
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
              <td className="total">{parsePrice(cartProducts.total)}</td>
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
  )
}

const Cart = () => {
  const { cart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cartProducts, setCartProducts] = useState({
    products: [],
    subTotal: 0,
    taxes: 0,
    total: 0,
  })
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      const products = await cartService.getCartProducts(cart.products)
      setCartProducts({
        products: products,
        subTotal: products.subTotal,
        taxes: products.taxes,
        total: products.total,
      })
      setIsLoading(false)
    }
    fetchProducts()
  }, [cart])
  return (
    <>
      <div className="container title-container py-3">
        <h1>Your Cart</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <ul className="list-group cart-items">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {cartProducts.products.map((product, index) => (
                    <CartItem key={index} product={product} />
                  ))}
                </>
              )}
            </ul>
          </div>
          {cart.length > 0 && <Summary cartProducts={cartProducts} />}
        </div>
      </div>
      {cart.length === 0 && (
        <div className="empty-cart-logo">
          <img src="/img/emptyCart.jpg" alt="empty-cart" />
          <div className="text-center">Your Cart is empty</div>
        </div>
      )}
    </>
  )
}

export default Cart
