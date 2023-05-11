var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
//
var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function (req, res, next) {
    res.json("Hello World")
})

app.get('/bookings', function (req, res, next) {
    connection.query(
        'SELECT * FROM `booking`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/booking/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `booking` WHERE `B_id` = ?',
        [id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.get('/bookings/waiting', function (req, res, next) {
    connection.query(
        'SELECT * FROM `booking` WHERE `status` = 0',
        function (err, results) {
            res.json(results);
        }
    );
})

app.get('/bookings/confirm', function (req, res, next) {
    connection.query(
        'SELECT * FROM `booking` WHERE `status` = 1',
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/addBooking', function (req, res, next) {
    connection.query(
        'INSERT INTO `booking`(`fname`, `lname`, `phone`, `room`, `people`, `D_from`, `D_to`, `airport`, `breakfast`, `rental`, `trip`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.phone, req.body.room, req.body.people, req.body.D_from, req.body.D_to, req.body.airport, req.body.breakfast, req.body.rental, req.body.trip, req.body.status],
        function (err, results) {
            res.json(results);
        }
    );
})

app.put('/updateBooking', function (req, res, next) {
    connection.query(
        'UPDATE `booking` SET `fname`= ?, `lname`= ?, `phone`= ?, `room`= ?, `people`= ?, `D_from`= ?, `D_to`= ?, `airport`= ?, `breakfast`= ?, `rental`= ?, `trip`= ?, `status`= ?  WHERE B_id = ?',
        [req.body.fname, req.body.lname, req.body.phone, req.body.room, req.body.people, req.body.D_from, req.body.D_to, req.body.airport, req.body.breakfast, req.body.rental, req.body.trip, req.body.status, req.body.B_id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/delBooking', function (req, res, next) {
    connection.query(
        'DELETE FROM `booking` WHERE B_id = ?',
        [req.body.B_id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000_Helloworld')
})