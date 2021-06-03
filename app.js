const express = require('express')
const app = express();

const ProjectRoute = require('./api/routes/Project')
const UserRoute= require('./API/routes/User');
app.use(express.urlencoded({extended:true}));

app.use('/project' , ProjectRoute);
app.use('/user', UserRoute);
module.exports = app