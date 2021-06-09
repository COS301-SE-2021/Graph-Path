const express = require('express')
const app = express();


const ProjectRoute = require('./api/routes/Project');
const UserRoute = require('./api/routes/User');
const TaskRoute = require('./api/routes/Task');


app.use('/project' , ProjectRoute);
app.use('/user', UserRoute);
app.use('/task',TaskRoute);
module.exports = app;