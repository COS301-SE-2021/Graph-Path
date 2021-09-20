const express = require('express') ;
const app = express();
const cors = require('cors') ;
const path = require('path') ;
//apidoc -i /Users/kagisodiagengmonareng/IdeaProjects/Graph-Path/1.Website/backend/src/API/routes -o apidoc/
const makeUserRoute = require('./API/routes/User');
const makeTaskRoute = require('./API/routes/Task');
const makeProjectRoute = require('./API/routes/Project');
//const makeNodeRoute = require('./API/routes/Node')
//const makeGraphRoute = require("./API/routes/graph");
const Home = require('./API/routes/Home');
const { auth, requiresAuth } = require('express-openid-connect');

/*
    function MakeApp() makes  an app with a passed in Database.
    this functions is to support dependency injection.
    In this way when we start the server we can pass in any database we want.
    Custom DB is passed in the server.js when making the app.

 */
function makeApp(InjectedDB)
{

    const DB = InjectedDB;


    const corsOptions = {
        exposedHeaders: 'Authorization',
      };
    //----------------------middleware------------------------
    app.use(cors(corsOptions));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));


    //-------make the routes with passed in DB ----------//
    const UserRoute = makeUserRoute(DB);
    const TaskRoute = makeTaskRoute(DB);
    const ProjectRoute = makeProjectRoute(DB);
    //const NodeRoute = makeNodeRoute(DB);
    //const GraphRoute = makeGraphRoute(DB);

    //----------- router setup  ------------------------//
    app.use('/project', ProjectRoute);
    app.use('/user', UserRoute);
    //app.use('/node', NodeRoute);
    app.use('/task', TaskRoute);
    //app.use('/graph',GraphRoute);

    //default /GET
    app.use('/', Home);
    //Handling Errors?
    app.use((req, res, next) => {
        const newError = new Error(`Not found. ${req.url}`);
        newError.status = 404;
        next(newError);

    });

    //Serve Error
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: error.message,
            type: error.type,
            loc: error.prototype,
            stack: error.stack,
            url: req.url

        });
    });

    return app;


}

module.exports = makeApp;