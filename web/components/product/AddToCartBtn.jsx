const AddToCartBtn = ({ onAddToCart }) => {
  return (
    <button
      className="btn btn-dark py-1 rounded-pill px-2"
      onClick={onAddToCart}
    >
      ADD TO CART
    </button>
  )
}

export default AddToCartBtn