var pg = require('pg');
var Promise = require('bluebird');
var Transaction = require('pg-transaction');
var connection = "postgres://postgres:@localhost/tickets";

var seats = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9",
    "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9",
    "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"];

var getNextOrderId = function(){
    return new Promise(function(resolve, reject){
        var client = new pg.Client(connection);
        client.connect();

        client.query("select nextval('orders_id_seq'::regclass)", function (err, result) {
            var nextId = result.rows[0].nextval;
            client.end();
            resolve(nextId);
        });
    });
};

var getNextOrderSeatsId = function(){
    return new Promise(function(resolve, reject) {
        var client = new pg.Client(connection);
        client.connect();

        client.query("select nextval('order_seats_id_seq'::regclass)", function (err, result) {
            var nextId = result.rows[0].nextval;
            client.end();
            resolve(nextId);
        });
    });
};

var getAvailableTickets = function (sessionId) {
    return new Promise(function(resolve, reject) {
        var client = new pg.Client(connection);
        client.connect();

        client.query('SELECT booked_seat from order_seats where session_id = $1', [sessionId], function (err, result) {
            var bookedSeats = result.rows.map(function (row) {
                return row.booked_seat;
            });

            var availableSeats = seats.filter(function (i) {
                return bookedSeats.indexOf(i) == -1
            });

            client.end();
            resolve(availableSeats);
        });
    });
};

var throwErr = function(err){
    console.log(err);
    if(err) throw err;
};

var persistOrder = function(tx){
  return new Promise(function(resolve, reject){
      getNextOrderId().then(function(orderId){
          tx.query('insert into orders(id) values($1)', [orderId]);
          resolve(orderId);
      });
  });
};

var persistSeats = function(tx, seats, orderId, sessionId){
    return new Promise(function(resolve, reject){
        var i = 0;
        seats.forEach(function (seat) {
            getNextOrderSeatsId().then(function(orderSeatId){
                tx.query('insert into order_seats(id, order_id, session_id, booked_seat) values($1, $2, $3, $4)', [orderSeatId, orderId, sessionId, seat]);
                i += 1;
                if(i == seats.length) resolve();
            });
        });
    });
};

exports.getAvailableTickets = function (req, res) {
    getAvailableTickets(req.param('id')).then(function (availableTickets) {
        res.send(availableTickets);
    });
};

exports.bookTickets = function (req, res) {
    var client = new pg.Client(connection);
    client.connect();

    var sessionId = req.body.session_id;
    var seats = req.body.seats;
    var tx = new Transaction(client);
    tx.on('error', throwErr);

    getAvailableTickets(sessionId).then(function (availableSeats) {
        var ticketsNotAvailable = seats.filter(function (seat) {
            return availableSeats.indexOf(seat) == -1;
        }).length;

        if (ticketsNotAvailable > 0) {
            res.send('Tickets not available!');

        } else {
            tx.begin();
            persistOrder(tx).then(function(orderId){
                persistSeats(tx, seats, orderId, sessionId).then(function(){
                    tx.commit(function(){
                        client.end();
                        res.send('OK');
                    });
                });
            });
        }
    });
};