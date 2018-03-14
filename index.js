const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const iprequest = require('request-ip');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/users');

const port = process.env.PORT || 6969;
mongoose.connect(config.localUrl);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

const apiRouters= express.Router();

require('./app/controllers/theardController')(apiRouters);
require('./app/controllers/userController')(apiRouters, app.set('superSecret', config.secret));
require('./app/controllers/roleController')(apiRouters);
require('./app/controllers/groupnewsController')(apiRouters);
require('./app/controllers/newsDraffController')(apiRouters);

app.use('/api',apiRouters);
app.listen(port);
console.log("chạy thành cmn công ở: " + port);