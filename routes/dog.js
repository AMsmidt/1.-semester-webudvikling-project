const con = require('../db-con');
const express = require('express');
const router = express.Router();
let sql = require('mysql');
var bodyParser = require('body-parser'); router.use(bodyParser.json()); router.use(bodyParser.urlencoded({ extended: false }));

con.beginTransaction(function (err) {
    if (err) { throw err; }
    router.get('/', function (req, res) {
        con.query('SELECT * FROM Dog', (err, results) => {
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
    router.get('/:sex', function (req, res, next) {
        var sex = req.params.sex;
        con.query('SELECT * FROM Dog WHERE Sex = ?', [sex], (err, result, fields) => {
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
                res.json(result);
                console.log('Transaction Complete.');
                res.end();
            });
        });
    });
});


module.exports = router;