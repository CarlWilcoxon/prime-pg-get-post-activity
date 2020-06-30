//Bring in the express module
//Don't use ./ so that it looks in the default node_modules folder

const express = require('express');
const app = express();
const bodyParser = require( 'body-parser' );
const books = require('./modules/books.route');

// uses
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );
app.use('/books', books);

const port = 5000;
app.listen( port , () => {
  console.log('Server is listening on port:', port);
})