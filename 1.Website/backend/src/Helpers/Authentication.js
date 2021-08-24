const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req,res,next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authheader.split(' ')[1];
    if(token === null){

        return res.sendStatus(401).send({
            message: "invalid null token",
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403).send({message: "inalid token"})

        req.user = user;
        next();

    } )


}


module.exports = {
    authenticateToken
}