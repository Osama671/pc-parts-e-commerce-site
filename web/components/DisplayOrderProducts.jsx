import productService from '../services/product.service.js'

export default function DisplayOrderProducts(productInfo) {
  return (
    <li className="product-item list-group-item d-flex justify-content-between align-items-center">
      <div className="product-details">
        <div className="d-flex justify-content-between align-items-center">
          <img className="image-placeholder" src={productInfo.details.image} />
          <div className="product">
            <a
              className="product-link"
              href={`/product/${productInfo.details.id}`}
            >
              <p className="product-name">{productInfo.details.name}</p>
            </a>
          </div>
        </div>
        <div className="d-flex justify-content-between px-4">
          <p>
            Quantity: <span className="quantity">{productInfo.quantity}</span>
          </p>
          <div className="item-price">
            {productService.renderPrice(
              productInfo.details.price * productInfo.quantity
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
