const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const iprequest = require('request-ip');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/users');

const port = process.env.PORT || 6969;
mongoose.connect(config.localUrl);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(morgan('dev'));
app.use((req, res, next) => {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
const apiRouters= express.Router();

require('./app/controllers/theardController')(apiRouters);
require('./app/controllers/userController')(apiRouters, app.set('superSecret', config.secret));


app.use('/api',apiRouters);
app.listen(port);
console.log("chạy thành cmn công ở: " + port);