const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test')

// initialising the express application
const app = express();



app.use(logger('dev'));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// > this is quite important - where you load the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/test", testRouter);



module.exports = app;
