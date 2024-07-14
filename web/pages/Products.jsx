import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import product from './css/Products.module.css'
import { productService } from './services/product-service.jsx'
import ProductList from '../components/ProductList.jsx'
import PageNumbers from '../components/PageNumbers.jsx'

const productsPerPage = 50
const maxPageNumbers = 10

export function Products() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const lastProductIndex = pageNumber * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const currentProducts = products.slice(firstProductIndex, lastProductIndex)

  // useEffect for Product category and search
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const getAllProducts = async () => {
      try {
        const response = await fetch('../../server/content/products.json')
        if (!response.ok) {
          throw new Error('Network response not ok :(')
        }
        const jsonData = await response.json()
        setProducts(
          productService.filterProducts(
            jsonData,
            queryParams.get('category'),
            queryParams.get('search')
          )
        )
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    getAllProducts()
  }, [category, search])

  // useEffect for pagination
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('page', pageNumber)
    navigate(`?${queryParams.toString()}`)
  }, [pageNumber, navigate])

  const handlePageChange = (page) => {
    setPageNumber(page)
  }

  const handleSearchSubmit = (newSearch) => {
    newSearch.preventDefault()
    setPageNumber(1)
  }

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory)
    setPageNumber(1)
  }

  const handleSearch = () => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('search', search)
    navigate(`?${queryParams}`)
    window.location.reload()
  }

  return (
    <>
      <div className="main">
        {/* Search bar container */}
        <div className="container mt-3 py-3">
          <form id="form" onSubmit={handleSearchSubmit}>
            <div className="input-group justify-content-center">
              <div className="form-outline w-50">
                <input
                  id="search-input"
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                id="search-button"
                className="btn btn-primary bg-sup-dark border-0"
                type="submit"
                onClick={handleSearch}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
        {/* Category Filter Container */}
        <div className="container my-3 pt-3">
          <div className="fs-2 fw-medium">Category</div>
          <hr />
          <div className="d-flex flex-row overflow-x-auto text-center fs-6">
            <a
              href="/products"
              onClick={() => handleCategoryClick('')}
              className="d-flex d-flex flex-column align-items-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/all.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
              />
              <label htmlFor="" className="text-light">
                .
              </label>
            </a>
            <a
              href="/products?category=cpu"
              onClick={() => handleCategoryClick('cpu')}
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/cpu.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">CPU</span>
            </a>
            <a
              href="/products?category=gpu"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/GPU.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1"> </span>
              GPU
            </a>
            <a
              href="/products?category=memory"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/ram.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Memory</span>
            </a>
            <a
              href="/products?category=cases"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/cases.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Cases</span>
            </a>
            <a
              href="/products?category=storage"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/storage.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Storage</span>
            </a>
            <a
              href="/products?category=power"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/power.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Power</span>
            </a>
            <a
              href="/products?category=monitor"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/monitor.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Monitor</span>
            </a>
            <a
              href="/products?category=accessories"
              className="d-row d-flex flex-column align-items-center text-center text-decoration-none text-dark mx-2"
            >
              <img
                src="/img/home/c-icons/keyboard.png"
                className={`${product.box} p-1 bg-sdown-dark rounded`}
                alt=""
                srcSet=""
              />
              <span className="pt-1">Accessories</span>
            </a>
          </div>
        </div>
        {/* Product search results */}

        <div className="container-fluid pt-3 bg-sup-dark">
          <div className="container">
            <div
              className="row p-0 m-0 row-cols-2 row-cols-md-5 g-3 justify-content-center"
              id="products-list"
            >
              <DisplayProducts productsList={currentProducts} />
            </div>
            <div
              className="row p-0 m-0 row-cols-2 row-cols-md-5 g-3 justify-content-center"
              id="placeholder-product"
            ></div>
          </div>

          <div id="pagination_div" className="py-3">
            <nav className="d-flex justify-content-center">
              <ul className="pagination m-0 p-0">
                {/*Previous button*/}
                <li
                  className={`${product.pageItem} ${
                    pageNumber === 1 ? 'disabled' : ''
                  }`}
                >
                  <a
                    className="page-link bg-sdown-dark text-light"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(pageNumber - 1)}
                  >
                    &laquo;
                  </a>
                </li>
                <PageNumbers
                  products={products}
                  pageNumber={pageNumber}
                  productsPerPage={productsPerPage}
                  maxPageNumbers={maxPageNumbers}
                  handlePageChange={handlePageChange}
                />
                {/*Next button*/}
                <li
                  className={`${product.pageItem} ${
                    pageNumber >= 1 ? 'disabled' : ''
                  }`}
                >
                  <a
                    className="page-link bg-sdown-dark text-light"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    &raquo;
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

function DisplayProducts({ productsList }) {
  return (
    <>
      {productsList.map((product) => {
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
