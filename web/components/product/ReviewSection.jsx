const ReviewsSection = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    console.log(reviews)
    return 'no Revieww mnon' // If there are no reviews or reviews array is empty, render nothing
  }

  return (
    <div className="container-fluid d-inline-block" id="reviewsSection">
      <div className="container d-inline-block" style={{ maxWidth: '768px' }}>
        <h2 className="mt-4 fw-bold">Reviews</h2>
        <div id="reviews">
          {reviews.map((review, index) => (
            <div key={index} className="card my-2">
              <div className="card-body">
                <h5 className="card-title">{review.username}</h5>
                <p className="card-text">Rating: {review.rating}</p>
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsSection
