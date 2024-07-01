const ReviewsSection = ({ reviews }) => {
  return (
    <div className="container-fluid d-inline-block" id="reviewsSection">
      <div className="container d-inline-block" style={{ maxWidth: '768px' }}>
        <h2 className="mt-4 fw-bold">Reviews</h2>
        <div id="reviews">
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="card my-2">
                <div className="card-body">
                  <h5 className="card-title">{review.username}</h5>
                  <p className="card-text">Rating: {review.rating}</p>
                  <p className="card-text">{review.review}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card my-2">
              <div className="card-body">
                <p className="card-text">No Reviews Available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewsSection
