const path = require('path') ;
const express = require('express') ;
const router = express.Router() ;


/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/',(req,res)=>{
    console.log('GET ',req.url)
    res.sendFile(path.join(__dirname+'../../../public/graph1.png') );
    //res.sendStatus(200)
}) ;


module.exports =  router ; 