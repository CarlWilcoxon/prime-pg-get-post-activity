console.log('js');

$(document).ready(onReady);

function onReady() {
  console.log('DOM is ready');

  //setup click handlers
  $('#bookForm').on('click', '#bookAddBtn', addBook);
}

function addBook(event) {
  event.preventDefault();

  $.ajax({
    type: 'GET',
    url: '/books'
    //then, when you get a response, append a table row to the DOM with the info you received
}).then(function (response) {
  $('#bookList').empty();  
  for (let i = 0; i < response.length; i++) {
        let item = response[i];
        $('#inventory').append(`
            <tr>
                <td class="item-name">${item.name}</td>
                <td>${item.description}</td>
            </tr>
        `);
    }
});
}