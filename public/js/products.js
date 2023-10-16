let counter = 4
let rowNum = 1

function getProductResults() {
  $.getJSON('../api/products.json', function (element) {
    element.forEach((arr) => {
      if (counter === 4) {
        // Create a new bootstrap row after every 4th result and in the very beginning.
        // Row IDs created to keep track of every row to know where to insert every column (1 search result).
        generateRow('product-row-num-' + rowNum)
        counter = 0
        rowNum++
      }

      //Create new product image and title. Four are occupied per row.
      generateColumn(arr.image, arr.name, rowNum - 1)
      counter++
    })
  })

  function generateRow(idNum) {
    $.get('/components/product-row.html', function (data) {
      const productRow = $.parseHTML(data)
      $(productRow).attr('id', idNum)
      $('#products-list').append(productRow)
    })
  }

  function generateColumn(imgURL, Title, rowNum) {
    $.get('/components/product-list.html', function (data) {
      const productList = $.parseHTML(data)
      $(productList).find('.image-placeholder').attr('src', imgURL)
      $(productList).find('.product-name').html(Title)

      // Adds the column to the current available row with a space available (up to 4 per row)
      $('#product-row-num-' + rowNum).append(productList)
    })
  }
}
