export function Home() {
  return (
    <>
      <div className="container-fluid cover min-vh-100 p-0">
        <div className="row justify-content-center m-0">
          <div className="col-12 col-md-6 text-light d-flex justify-content-end align-items-center py-5">
            <p>
              <span className="fs-2">Ready to level up your device?</span>
              <br />
              <span className="fs-2 fw-bold">
                LETS BUILD YOUR DREAM PC <br />
                TOGETHER!
              </span>
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex">
            <img
              src="/img/home/custom_pc-s.png"
              className="m-auto w-75"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="container py-3">
        <div className="fs-2 fw-medium my-3">Browse By Category</div>
        <div className="p-3 d-flex flex-row overflow-x-auto text-center">
          <a
            href="/v1/products"
            className="col-3 col-md-2 d-flex flex-column align-items-center justify-content-center fs-4 p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            All
          </a>
          <a
            href="/v1/products?category=cpu"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img src="/img/home/c-icons/cpu.png" className="c-icon" alt="" />
            CPU
          </a>
          <a
            href="/v1/products?category=gpu"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img src="/img/home/c-icons/GPU.png" className="c-icon" alt="" />
            GPU
          </a>
          <a
            href="/v1/products?category=memory"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img src="/img/home/c-icons/ram.png" className="c-icon" alt="" />
            Memory
          </a>
          <a
            href="/v1/products?category=cases"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img src="/img/home/c-icons/cases.png" className="c-icon" alt="" />
            Cases
          </a>
          <a
            href="/v1/products?category=storage"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img
              src="/img/home/c-icons/storage.png"
              className="c-icon"
              alt=""
            />
            Storage
          </a>
          <a
            href="/v1/products?category=power"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img src="/img/home/c-icons/power.png" className="c-icon" alt="" />
            Power
          </a>
          <a
            href="/v1/products?category=monitor"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img
              src="/img/home/c-icons/monitor.png"
              className="c-icon"
              alt=""
            />
            Monitor
          </a>
          <a
            href="/v1/products?category=accessories"
            className="col-3 col-md-2 d-flex flex-column align-items-center p-2 mx-1 border text-decoration-none text-light bg-sdown-dark rounded-4"
          >
            <img
              src="/img/home/c-icons/keyboard.png"
              className="c-icon"
              alt=""
            />
            Accessories
          </a>
        </div>
      </div>

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

        <div className="d-flex justify-content-center">
          <img src="/img/home/ad.png" className="w-75 rounded" alt="" />
        </div>
      </div>
    </>
  )
}
