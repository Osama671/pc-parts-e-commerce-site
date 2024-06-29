import Description from './Description.jsx'
import ReviewsSection from './ReviewSection.jsx'
import '../../css/product.css'
const ProductContainer = ({ product }) => {
  return (
    <div className="container-fluid d-flex mt-3" id="productContainer">
      <div className="row  ">
        <div className="img-container col-md-6 col-sm-12 text-center ">
          <div
            id="carouselExampleIndicators"
            className="carousel slide "
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {product.alt_images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner square_aspectRation">
              {product.alt_images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev text-dark"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Description component */}
        <Description product={product} />
        <ReviewsSection reviews={product.reviews} />
      </div>
    </div>
  )
}

export default ProductContainer
