const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cors = require('cors');

const config = require('./util/config');
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news');
const con = require('./util/database');

const app = express();
app.use(cors());

app.use(bodyParser.json()); // application/json

app.use('/user', userRoutes);
app.use('/news',newsRoutes);

app.listen(8085);
console.log("At end");