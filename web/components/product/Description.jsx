const Description = ({ product }) => {
  if (!product) return null // Handle case when product is not yet fetched or does not exist

  return (
    <div className="description col-md-6 col-sm-12">
      <div className="desc-container">
        {/* Product title */}
        <h2 className="product-title">{product.name}</h2>
        <br />
        {/* Product description */}
        <p
          className="description-details"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></p>
        {/* Product price */}
        <p className="price">{product.price}</p>
        {/* Stock count */}
        <p className="stockCount">{product.stock} left in stock</p>
        {/* Quantity selector and Add to Cart */}
        <div className="quantity-selector d-flex justify-content-between">
          <div className="container-fluid">
            <div className="stockButton stockButton-outline btn btn-dark">
              + <span className="p-2 bg-light text-dark">0</span> -
            </div>
            <div className="mt-2">
              {/* Add to Cart button */}
              <button className="addToCart btn btn-dark" id="addToCart">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
