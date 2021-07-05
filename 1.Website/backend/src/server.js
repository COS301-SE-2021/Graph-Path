const http = require('http');
const app = require('./app');
const port = process.env.PORT || 9001 || 3000 ; 

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
}) ;
