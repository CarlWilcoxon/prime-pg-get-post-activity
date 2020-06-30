// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );
// routes
router.get( '/', ( req, res )=>{
    console.log( '/books GET' );
    /// - query: SELECT * FROM "books" - ///
    let queryString = `SELECT * FROM "books"`;
    pool.query( queryString ).then( ( result )=>{
        // success
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.send( 500 );
    })
}) // end /books GET

router.post( '/', ( req, res )=>{
    console.log( 'in /books POST:', req.body );
    let queryString = `INSERT INTO "books" ( "first_name", "last_name", "dob", "height" ) 
        VALUES ( $1, $2, $3, $4 )`;
    pool.query( queryString, 
        [ req.body.first_name, req.body.last_name , req.body.dob, req.body.height ] ).then( ( result )=>{
            res.sendStatus( 201 );
        }).catch( ( err )=>{
            console.log( err );
            res.sendStatus( 500 );
        }) //end query
})
// export
module.exports = router;