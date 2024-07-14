import product from '../pages/css/Products.module.css'

export default function PageNumbers({
  products,
  pageNumber,
  productsPerPage,
  maxPageNumbers,
  handlePageChange,
}) {
  const totalPages = Math.ceil(products.length / productsPerPage)

  let startPage = Math.max(1, pageNumber - Math.floor(maxPageNumbers / 2))
  let lastPage = Math.min(totalPages, startPage + maxPageNumbers - 1)

  if (lastPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, lastPage - maxPageNumbers + 1)
  }

  const pageNumbers = []
  for (let i = startPage; i <= lastPage; i++) {
    pageNumbers.push(
      <li
        key={i}
        className={`${product.pageItem} ${
          pageNumber === i ? product.active : ''
        }`}
      >
        <a
          href="#"
          className="page-link bg-sdown-dark text-light"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </a>
      </li>
    )
  }

  return (
    <li
      className={`${product.pageItem} ${
        pageNumber === totalPages ? 'disabled' : ''
      }`}
    >
      {pageNumbers}
    </li>
  )
}
