import { useEffect, useState } from 'react'
import productService from '../../services/product.service.js'
import ProductList from '../ProductsList.jsx'

export default function FeaturedProducts() {
  let [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () =>
      productService
        .getFeaturedProducts()
        .then((product) => setProducts(product))
    getProducts()
  }, [])

  return (
    <>
      <div className="container-fluid bg-sup-dark p-3 d-flex flex-column justify-content-center align-items-center">
        <div
          id="featured"
          className="container d-flex flex-column bg-sup-dark align-items-center m-5"
        >
          <p className="text-light fs-2 fw-bold">Featured Products</p>
          <p className="text-light fs-3 text-center">
            Hurry up! Our best products are running out!
          </p>
        </div>
        {/* Featured Images */}
        <div className="container-fluid mb-5 bg-sup-dark">
          <div className="container">
            <div
              className="row p-0 m-0 row-cols-2 row-cols-md-5 g-3 justify-content-center fs-3 mb-5"
              id="products-list"
            >
              <DisplayProducts products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DisplayProducts({ products }) {
  console.log(products)
  return (
    <>
      {products.map((product) => {
        let properties = {
          id: product.id,
          img: product.image,
          productName: product.name,
          price: productService.renderPrice(product.price),
        }
        return <ProductList key={product.id} {...properties} />
      })}
    </>
  )
}

// function ProductList({ id, img, productName, price }) {
//   return (
//     <>
//       <div className="col">
//         <div className="bg-sdown-dark h-100 overflow-hidden d-flex flex-column">
//           <a
//             className="product-link text-decoration-none h-100 d-flex flex-column"
//             href={`/v1/product?id=${id}`}
//           >
//             <div
//               className="overflow-hidden d-flex justify-content-center p-1"
//               style={{ aspectRatio: '1 / 1', backgroundColor: '#fff' }}
//             >
//               {/* img dimensions adjusted here */}
//               <img
//                 className="image-placeholder img-fluid"
//                 src={img}
//                 style={{
//                   maxWidth: '100%',
//                   height: '100%',
//                   objectFit: 'contain',
//                 }}
//                 alt="Product Image"
//               />
//             </div>
//             <div className="product-name text-light two-line-ellipsis">
//               {productName}
//             </div>
//             <div className="product-price p-2 text-light fw-bold mt-auto border border-dark">
//               {price}
//             </div>
//           </a>
//         </div>
//       </div>
//     </>
//   )
// }
