let counter = 4
let rowNum = 1

function getProductResults() {
  $.getJSON('../api/products.json', function (element) {
    element.forEach((arr) => {
      //Create new product image and title. Four are occupied per row.
      generateColumn(arr.image, arr.name, rowNum - 1)
      counter++
    })
  })

  function generateColumn(imgURL, Title, rowNum) {
    $.get('/components/product-list.html', function (data) {
      const productList = $.parseHTML(data)
      $(productList).find('.image-placeholder').attr('src', imgURL)
      $(productList).find('.product-name').html(Title)

      // Adds the column to the current available row with a space available (up to 4 per row)
      $('#products-list').append(productList)
    })
  }
}
