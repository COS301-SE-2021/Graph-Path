const express = require('express')
const app = express();

const ProjectRoute = require('./api/routes/Project')
app.use(express.urlencoded({extended:true}));

app.use('/project' , ProjectRoute);
module.exports = app