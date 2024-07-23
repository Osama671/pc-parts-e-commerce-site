import '../css/paymentInfo.css'

export default function PaymentInfo() {
  return (
    <div className="container w-50 p-0 position-fixed fade-in" style={{top: "25%", left: "25%"}}>
      <div className="card px-4">
        <p className="h8 py-3">Payment Info</p>
        <div className="row gx-3">
          <div className="col-12">
            <div className="d-flex flex-column">
              <p className="text mb-1">NamePerson Name</p>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Name"
                value="Barry Allen"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex flex-column">
              <p className="text mb-1">Card Number</p>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="1234 5678 435678"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <p className="text mb-1">Expiry</p>
              <input
                className="form-control mb-3"
                type="text"
                placeholder="MM/YYYY"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <p className="text mb-1">CVV/CVC</p>
              <input
                className="form-control mb-3 pt-2 "
                type="password"
                placeholder="***"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3 d-flex flex-row-reverse gap-2">
              <button className="ml=auto btn btn-primary" >Confirm Payment</button>
              <button className="ml=auto btn btn-secondary">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
