import '../css/paymentInfo.css'

export default function PaymentInfo({ handleCheckout, changeDisplayPaymentInfoState }) {
  return (
    <form onSubmit={handleCheckout}>
      {/* This div will be used with animation. Will try to get it to work tomorrow on Tuesday (23/07/2024) */}
      <div className="container-fluid w-100 h-100 position-relative fade-in-screen">
        <div
          className="container w-50 p-0 position-fixed fade-in-card"
          style={{ top: '25%', left: '25%' }}
        >
          <div className="card px-4">
            <p className="h8 py-3">Payment Info</p>
            <div className="row gx-3">
              <div className="col-12">
                <div className="d-flex flex-column">
                  <p className="text mb-1">Full Name</p>
                  {/* pattern: Characters a-z and A-Z two times (first name and last name) e.g. Mohammed Jordan */}
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Name"
                    pattern='^[A-Za-z]+(?: [A-Za-z]+){1,2}$'
                    maxLength={40}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex flex-column">
                  <p className="text mb-1">Card Number</p>
                  {/* pattern: Numbers in sets of 4 four times e.g. 1234 5678 6969 0987 */}
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    pattern="^(\d{4} ?){4}$"
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-column">
                  <p className="text mb-1">Expiry</p>
                  {/* pattern: MM/YYYY where MM is no greater than 12. Only numbers allowed*/}
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="MM/YYYY"
                    pattern="^(0[1-9]|1[0-2])\/\d{4}$"
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex flex-column">
                  <p className="text mb-1">CVV/CVC</p>
                  {/* pattern: 3 numbers only uwu */}
                  <input
                    className="form-control mb-3 pt-2 "
                    type="password"
                    placeholder="***"
                    pattern="\d{3}"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex flex-row-reverse gap-2">
                  <button className="ml=auto btn btn-primary" type="submit">
                    Confirm Payment
                  </button>
                  <button
                    className="ml=auto btn btn-secondary"
                    onClick={changeDisplayPaymentInfoState}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
