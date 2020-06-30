// requires
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// routes
router.get( '/', ( req, res )=>{
    console.log( '/magazines GET' );
    /// - query: SELECT * FROM "magazines" - ///
    let queryString = `SELECT * FROM "magazines"`;
    pool.query( queryString ).then( ( result )=>{
        // success
        console.log(result.rows);
        res.send( result.rows );
    }).catch( ( err )=>{
        // error
        res.sendStatus( 500 );
    })
}) // end /magazines GET

router.post( '/', ( req, res )=>{
    console.log( 'in /magazines POST:', req.body );
    let queryString = `INSERT INTO "magazines" ( "title", "issue_number", "pages" ) 
        VALUES ( $1, $2, $3 )`;
    pool.query( queryString, 
        [ req.body.title, req.body.issue_number , req.body.pages ] ).then( ( result )=>{
            res.sendStatus( 201 );
        }).catch( ( err )=>{
            console.log( err );
            res.sendStatus( 500 );
        }) //end query
})
// export
module.exports = router;