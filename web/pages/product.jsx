import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductContainer from '../components/product/ProductContainer.jsx'
import { useParams } from 'react-router-dom'

const Product = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://fsdm-pc-shop-v1.georgevm.com/products/${id}`
        )
        setProduct(response.data) // Assuming response.data is the product details JSON
      } catch (error) {
        console.error('Error fetching product details:', error)
        setProduct(null) // Set product to null if there's an error
      }
    }

    fetchProduct()
  }, [id]) // Include id in the dependency array to fetch new product when id changes

  return (
    <div>
      {product ? (
        <ProductContainer product={product} />
      ) : (
        <div className="container  my-3" id="productContainer">
          <div className="row m-0 p-0 ">
            <div className="col-12 col-md-6 bg-light placeholder-glow  ">
              <div className="placeholder w-100 h-100"></div>
            </div>
            <div className="col-12 col-md-6 bg-light placeholder-glow ">
              <h2 className="product-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h2>
              <p className="description-details placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
              </p>
              <ul className="placeholder-glow">
                <li className="placeholder col-6"></li>
                <li className="placeholder col-4"></li>
                <li className="placeholder col-4"></li>
              </ul>
              <p className="price placeholder-glow">
                <span className="placeholder col-3"></span>
              </p>
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
          <div className="container ">
            <h2 className="mt-4 fw-bold">Reviews</h2>
            <div id="reviews" className="w-100 ">
              {/* Placeholder card */}
              <div className="card my-2 placeholder-glow w-100">
                <div className="card-body w-100  ">
                  {/* Placeholder title */}
                  <h5 className="card-title placeholder w-25"> </h5>
                  {/* Placeholder text lines */} <br />
                  <p className="card-text placeholder w-75"></p>
                  <p className="card-text placeholder w-75"></p>
                  <p className="card-text placeholder w-50"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
