console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('DOM is ready');

  //load books already in DB
  loadBooks();
  //setup click handlers
  $('#bookForm').on('click', '#bookAddBtn', addBook);
}

function addBook(event) {
  if (false) { //TODO add input validation
  } else 
  {event.preventDefault();}

  let tempTitle = $('#bookTitleIn');
  let tempAuthor = $('#bookAuthorIn');
  let tempPublished = $('#bookPublishedIn');
  let newBook = {
    title: tempTitle,
    author: tempAuthor,
    published: tempPublished
  }

  $.ajax({
    type: 'POST',
    url: '/books',
    data:newBook
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    console.log('Book added successfully.');
    loadBooks();
  }).catch(function  (err) {
    console.log('error:', err);
  })
  
}

function loadBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    $('#bookList').children('tbody').empty();  
    console.log(response);
    for (let i = 0; i < response.length; i++) {
          let item = response[i];
          console.log('inside loop:', item);
          $('#bookList').children('tbody').append(`
              <tr>
                  <td>${item.title}</td>
                  <td>${item.author}</td>
                  <td>${item.published}</td>
              </tr>
          `);
      }
  }).catch(function  (err) {
    console.log('error:', err);
  })
}