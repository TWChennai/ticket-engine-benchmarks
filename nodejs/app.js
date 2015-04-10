var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bookingEngine = require('./src/booking_engine');

var app = express();
var uuid = require('express-request-id')();

app.use(logger('dev'));
app.use(uuid);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/sessions/:id', bookingEngine.getAvailableTickets);
app.post('/orders', bookingEngine.bookTickets);

module.exports = app;
