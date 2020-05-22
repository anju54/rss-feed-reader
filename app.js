const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cors = require('cors');

const config = require('./util/config');
const userRoutes = require('./routes/user');
const con = require('./util/database');

const app = express();
app.use(cors());

app.use(bodyParser.json()); // application/json

app.use('/user', userRoutes);

app.listen(8085);
console.log("At end");