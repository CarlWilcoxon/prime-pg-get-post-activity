console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('DOM is ready');

  //load books already in DB
  loadBooks();
  loadMagazines();
  //setup click handlers
  $('#bookForm').on('click', '#bookAddBtn', addBook);
}

function addBook(event) {
  let tempTitle = $('#bookTitleIn').val();
  let tempAuthor = $('#bookAuthorIn').val();
  let tempPublished = $('#bookPublishedIn').val();
  
  let newBook = {
    title: tempTitle,
    author: tempAuthor,
    published: tempPublished
  }

  console.log('about to add book:', newBook);
  $.ajax({
    type: 'POST',
    url: '/books',
    data: newBook
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

function addMagazine(event) {
  let tempTitle = $('#magazineTitleIn').val();
  let tempIssue = $('#magazineIssueNumberIn').val();
  let tempPages = $('#magazinePagesIn').val();
  
  let newMagazine = {
    title: tempTitle,
    issue_number: tempIssue,
    pages: tempPages
  }

  console.log('about to add book:', newMagazine);
  $.ajax({
    type: 'POST',
    url: '/magazine',
    data: newMagazine
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    console.log('Book added successfully.');
    loadMagazines();
  }).catch(function  (err) {
    console.log('error:', err);
  })
  
}

function loadMagazines() {
  $.ajax({
    type: 'GET',
    url: '/magazines'
    //then, when you get a response, append a table row to the DOM with the info you received
  }).then(function (response) {
    $('#magazineList').children('tbody').empty();  
    console.log(response);
    for (let i = 0; i < response.length; i++) {
          let item = response[i];
          console.log('inside loop:', item);
          $('#magazineList').children('tbody').append(`
              <tr>
                  <td>${item.title}</td>
                  <td>${item.issue_number}</td>
                  <td>${item.pages}</td>
              </tr>
          `);
      }
  }).catch(function  (err) {
    console.log('error:', err);
  })
}