const http = require('http');
const port = process.env.PORT || 9001 || 3000 ;
const makeApp = require('./app');
const AliDB = require('./Controllers/NewDBController');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:9001",
            },
        ],
    },
    apis: ['./API/routes/*.js'],
};

const swaggerDocs =swaggerJsDoc(swaggerOptions);
const app = makeApp(AliDB);

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
}) ;

