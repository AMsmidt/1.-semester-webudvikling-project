const con = require('../db-con');
const express = require('express');
const router = express.Router();
let sql = require('mysql');
var bodyParser = require('body-parser'); router.use(bodyParser.json()); router.use(bodyParser.urlencoded({ extended: true }));

con.beginTransaction(function (err) {
    if (err) { throw err; }
    router.get('/:MatingID', function (req, res) {
        var MatingID = req.params.MatingID;
        con.query('SELECT * FROM Mating WHERE MatingID = ?', [MatingID], (err, results) => {
            if (err) {
                con.rollback(function () {
                    throw err;
                });
            }
            con.commit(function (err) {
                if (err) {
                    con.rollback(function () {
                        throw err;
                    });
                }
                res.json(results);
                console.log('Transaction Complete.');
                res.end();
            });
        });
    });
});

con.beginTransaction(function (err) {
    if (err) { throw err; }
    router.post('/', function (req, res, next) {
        var FK_dogID_Male = req.body.FK_dogID_Male;
        var FK_dogID_Female = req.body.FK_dogID_Female;
        var Comment = req.body.Comment;
        con.query('INSERT INTO Mating (FK_dogID_Male, FK_dogID_Female, Comment) VALUES (?, ?, ?)', [FK_dogID_Male, FK_dogID_Female, Comment], function (err, results, fields) {
            if (err) {
                con.rollback(function () {
                    throw err;
                });
            }
            con.commit(function (err) {
                if (err) {
                    con.rollback(function () {
                        throw err;
                    });
                }
                console.log('Transaction Complete.');
                res.end();
            });
        });
    });
});

con.beginTransaction(function (err) {
    if (err) { throw err; }
    router.put('/', function (req, res, next) {
        var Approved = req.body.Approved;
        var Result = req.body.Result;
        var MatingID = req.body.MatingID;
        con.query('UPDATE Mating SET Approved = ?, Result = ? WHERE MatingID = ?', [Approved, Result, MatingID], function (err, results, fields) {
            if (err) {
                con.rollback(function () {
                    throw err;
                });
            }
            con.commit(function (err) {
                if (err) {
                    con.rollback(function () {
                        throw err;
                    });
                }
                console.log('Transaction Complete.');
                res.end();
            });
        });
    });
});

con.beginTransaction(function (err) {
    if (err) { throw err; }
    router.delete('/', (req, res) => {
        var MatingIDdel = req.body.MatingIDdel;
        con.query('DELETE FROM Mating WHERE MatingID= ?', [MatingIDdel], function (err, results, fields) {
            console.log(MatingIDdel);

            if (err) {
                con.rollback(function () {
                    throw err;
                });
            }
            con.commit(function (err) {
                if (err) {
                    con.rollback(function () {
                        throw err;
                    });
                }
                console.log('Transaction Complete.');
                res.end();
            });
        });
    });
});

module.exports = router;