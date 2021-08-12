const express = require('express') ;
const app = express();
const cors = require('cors') ;
const path = require('path') ;



//const DefaultInjectDB = require('./Controllers/DBController').getDB()
//const mongoDBInstance = require('./Controllers/DBController')
// const testDB = require('./Controllers/DBtestController')

/*
    function MakeApp() makes  an app with a passed in Database.
    this functions is to support dependency injection.
    In this way when we start the server we can pass in any database we want.
    so in the case of testing we pass in the mock db and still test the routes

    if defaultDB is true it will start the DB with one we previously set before.
 */
function makeApp(defaultDB , InjectedDB)
{

    if(defaultDB === true) {
        console.log('Using default DB');
        const mongoDBInstance = require('./Controllers/DBController')
        mongoDBInstance.connect( (error) => {

            if (error) {
                console.log('error message here', error);
            }

            const DB =  mongoDBInstance.getDB();

            //------------- DB dependency injection setup------
            const makeUserRoute = require('./API/routes/User');
            const makeTaskRoute = require('./API/routes/Task');
            const makeProjectRoute = require('./API/routes/Project');
            const makeNodeRoute = require('./API/routes/Node')

            //--------------------------------------------------

            //----------------------middleware------------------------
            app.use(cors());
            app.use(express.urlencoded({extended: true}));
            app.use(express.json());
            app.use(express.static(path.join(__dirname, 'public')));
            //------------------------------------------------------------


            const Home = require('./API/routes/Home');
            //---------------------------------------------------------------------

            // ----------------inject passed in DB into routes---------------
            const UserRoute = makeUserRoute(DB);
            const TaskRoute = makeTaskRoute(DB);
            const ProjectRoute = makeProjectRoute(DB);
            const NodeRoute = makeNodeRoute(DB);
            //routes
            app.use('/project', ProjectRoute);
            app.use('/user', UserRoute);
            app.use('/node', NodeRoute);
            app.use('/task', TaskRoute);

            //---------------------------------------------------------------------

            //default /GET
            app.use('/', Home);
            //Handling Errors?
            app.use((req, res, next) => {
                console.log('Error received and serving..',req.url)
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



        })
       }

    else {

        const DB = InjectedDB
        //------------- DB dependency injection setup------
        const makeUserRoute = require('./API/routes/User');
        const makeTaskRoute = require('./API/routes/Task');
        //makeTaskRoute(DB);
        //makeUserRoute(DB);
        //--------------------------------------------------


        //----------------------middleware------------------------
        app.use(cors());
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')));
        //------------------------------------------------------------

        //--------------route setup --------------------------------
       // const ProjectRoute = require('./api/routes/Project');
        //const UserRoute= require('./API/routes/User');
        //const NodeRoute = require('./API/routes/Node');
        //const Task2Route = require('./API/routes/Tasks2');
        //const TaskRoute = require('./API/routes/Task');
        const Home = require('./API/routes/Home');

        // ----------------inject passed in DB into routes---------------
        const UserRoute = makeUserRoute(DB);
        const TaskRoute = makeTaskRoute(DB);
        //routes
        //app.use('/project', ProjectRoute);
        app.use('/user', UserRoute);
        //app.use('/node', NodeRoute);
        app.use('/task', TaskRoute);
        //app.use('/task2', Task2Route);
        //---------------------------------------------------------------------

        //default /GET
        app.use('/', Home);
        //Handling Errors?
        app.use((req, res, next) => {
            const newError = new Error(`Not found. ${req.url}`);
            newError.status = 404;
            next(newError);
            // console.log('Created Error') ;
            // console.log('req body:',JSON.stringify(req.body) ) ;
            // console.log('req files?',JSON.stringify(req.files) ) ;
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

        //module.exports = app
        return app;

    }

    return app;

}

module.exports = makeApp;