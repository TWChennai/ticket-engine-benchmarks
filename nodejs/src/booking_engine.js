var pg = require('pg');
var Transaction = require('pg-transaction');
var connection = "postgres://postgres:@localhost/booking_engine";

var seats = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9",
    "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9",
    "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"];

var getAvailableTickets = function (sessionId, callback) {
    var client = new pg.Client(connection);
    client.connect();
    client.query('SELECT seat_name from orders_seats where session_id = $1', [sessionId], function (err, result) {
        var bookedSeats = result.rows.map(function (row) {
            return row.seat_name;
        });

        var availableSeats = seats.filter(function (i) {
            return bookedSeats.indexOf(i) == -1
        });

        callback(availableSeats);
    });
};

var throwErr = function(err){
    console.log(err);
    if(err) throw err;
};

exports.getAvailableTickets = function (req, res) {
    getAvailableTickets(req.param('id'), function (availableTickets) {
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

    getAvailableTickets(sessionId, function (availableSeats) {
        var ticketsNotAvailable = seats.filter(function (seat) {
            return availableSeats.indexOf(seat) == -1;
        }).length;

        if (ticketsNotAvailable > 0) {
            res.send('Tickets not available!');

        } else {
            tx.begin();
            tx.query('insert into orders(id) values($1)', [req.id]);

            seats.forEach(function (seat) {
                tx.query('insert into orders_seats(id, session_id, seat_name) values($1, $2, $3)', [req.id, sessionId, seat]);
            });
            tx.commit(function () {
                client.end();
                res.send('OK');
            });
        }
    });
};