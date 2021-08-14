const path = require('path') ;
const express = require('express') ;
const router = express.Router() ;

/**@swagger
 *
 * /:
 *   get:
 *     summary: "this is the default home route"
 *     responses:
 *       200:
 *         description: successful retrieval of home page
 *         contents:
 *           html/text
 *
 *
 * */
router.get('/',(req,res)=>{
    console.log('GET ',req.url)
    res.sendFile(path.join(__dirname+'../../../public/graph1.png') );
    //res.sendStatus(200)
}) ;


module.exports =  router ; 