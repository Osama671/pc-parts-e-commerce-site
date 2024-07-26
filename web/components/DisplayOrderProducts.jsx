export default function DisplayOrderProducts(products) {
  return (
    <li className="product-item list-group-item d-flex justify-content-between align-items-center">
      <div className="product-details">
        <div className="d-flex justify-content-between align-items-center">
          <img className="image-placeholder" />
          <div className="product">
            <a className="product-link" href="/v1/product?id=<product_id>">
              <p className="product-name"></p>
            </a>
          </div>
        </div>
        <div className="d-flex justify-content-between px-4">
          <p>
            Quantity: <span className="quantity">0</span>
          </p>
          <div className="item-price">Price</div>
        </div>
      </div>
    </li>
  )
}
