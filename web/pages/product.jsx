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
        <>
          <ProductContainer product={product} />
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  )
}

export default Product
