const path = require('path') ;
const express = require('express') ;
const router = express.Router() ;


router.get('/',(req,res)=>{
    console.log('GET ',req.url)
    res.sendFile(path.join(__dirname+'../../../public/graph1.png') );
    //res.sendStatus(200)
}) ;


module.exports =  router ; 