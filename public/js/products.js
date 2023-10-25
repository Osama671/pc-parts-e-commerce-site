async function getProductResults() {
  const productsPerPage = 5
  const productsLimit = 0
  const products = await productService.findProducts()
  if (products.length > 0) {
    if (products.length > 5) {
      const totalPages = Math.ceil(products.length / productsPerPage)
      document.getElementById('pagination').hidden = false
      this.productsLimit = 4

      $('#pagination .pagination').append(
        '<li class="page-item"> <a class="page-link" href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span></a></li>'
      )
      for (let i = 0; i < totalPages; i++) {
        $('#pagination .pagination').append(
          `<li class="page-item"><a class="page-link" href="#" data-page="${
            i + 1
          }"> ${i + 1} </a></li>`
        )
      }
      $('#pagination .pagination').append(
        '<li class="page-item"> <a class="page-link" href="#" aria-label="Previous"> <span aria-hidden="true">&raquo;</span></a></li>'
      )

      //$('#pagination li').first().find('a').addClass('current')
    } else {
      document.getElementById('pagination').hidden = false
    }

    const productTemplate = await $.get('/components/product-list.html')
    for (let i = 0; i <= this.productsLimit; i++) {
      generateColumn(
        productTemplate,
        products[i].id,
        products[i].image,
        products[i].name
      )
    }
  }
}

function generateColumn(template, id, imgURL, Title) {
  const productList = $.parseHTML(template)
  $(productList).find('.image-placeholder').attr('src', imgURL)
  $(productList).find('.product-name').html(Title)
  $(productList)
    .find('.product-link')
    .each(function () {
      $(this).attr('href', `/product?id=${id}`)
    })

  $('#products-list').append(productList)
}

getProductResults()
