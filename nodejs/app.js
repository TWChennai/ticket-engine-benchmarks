var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();
var uuid = require('express-request-id')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(uuid);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var pg = require('pg');
var Transaction = require('pg-transaction');

var conString = "postgres://postgres:@localhost/booking_engine";
var seats = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9",
    "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9",
    "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"];


var getAvailableTickets = function (sessionId, callback) {
    var client = new pg.Client(conString);
    client.connect();
    client.query('SELECT seat_name from orders_seats where session_id = $1', [sessionId], function(err, result){
        var bookedSeats = result.rows.map(function(row){
            return row.seat_name;
        });

        console.log(seats);
        console.log(bookedSeats);

        var availableSeats = seats.filter(function (i) {
            return bookedSeats.indexOf(i) == -1
        });

        callback(availableSeats);
    });
};

app.use('/sessions/:id', function (req, res) {
    getAvailableTickets(req.param('id'), function(availableTickets){
        res.send(availableTickets);
    });
});

var die = function(err){
  console.log(err);
  if(err) throw err;
};

app.post('/orders', function (req, res) {
    var client = new pg.Client(conString);
    client.connect();

    var sessionId = req.body.session_id;
    var seats = req.body.seats;
    var tx = new Transaction(client);
    tx.on('error', die);

    getAvailableTickets(sessionId, function(availableSeats){
        var ticketsNotAvailable = seats.filter(function(seat){
            return availableSeats.indexOf(seat) == -1;
        }).length;

        if(response = ticketsNotAvailable > 0){
            res.send('Tickets not available!');

        } else {
            tx.begin();
            tx.query('insert into orders(id) values($1)', [req.id]);

            seats.forEach(function (seat) {
                tx.query('insert into orders_seats(id, session_id, seat_name) values($1, $2, $3)', [req.id, sessionId, seat]);
            });
            tx.commit(function(){
                client.end();
                res.send('OK');
            });
        }
    });
});


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
