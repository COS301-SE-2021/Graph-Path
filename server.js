const http = require('http');
const port = process.env.PORT || 9001 || 3000 ;
//const mongoDBInstance = require('./Controllers/DBController')
//const server = http.createServer(app);
/*
server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
}) ;


server.on("listening", () => {
    const addr = server.address();
    console.log("This my adr: ",addr)
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    // eslint-disable-next-line no-console
    console.log(`Listening on ${bind}`);
})
*/

/*mongoDBInstance.connect( (error) => {

    if(error){
        console.log('error message here', error);
    }

    const makeApp = require('./app');

    const  DB = mongoDBInstance.getDB()
    const app = makeApp()
    const server = http.createServer(app);

    server.listen(port,()=>{
        console.log(`server running on http://localhost:${port}`)
    }) ;

})*/

const makeApp = require('./app');
const app = makeApp(true,)
const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
}) ;

