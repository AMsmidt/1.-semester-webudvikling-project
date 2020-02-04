const con = require('../db-con');
var express = require('express');
var router = express.Router();
let sql = require('mysql');
var bodyParser = require('body-parser'); router.use(bodyParser.json()); router.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');

con.beginTransaction(function (err) {
  if (err) { throw err; }
  router.get('/', function (req, res, next) {
    res.sendFile('login.html', { root: 'views', title: 'Login', id: 'login' });
  });
});

con.beginTransaction(function (err) {
  if (err) { throw err; }
  router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    con.query('SELECT * FROM Login WHERE Username =  ? AND Password = ?', [username, password], function (err, results, fields) {
      var OwnerID;
      if (results.length == 1) {
        var OwnerID = results[0].FK_OwnerID;
      }

      if (err) {
        con.rollback(function () {
          throw err;
        });
      }

      con.query('SELECT FK_Account_typeID FROM Login INNER JOIN Owner ON Login.FK_OwnerID = Owner.OwnerID WHERE Login.FK_OwnerID = ?', [OwnerID], function (err, result, fields) {
        if (results.length == 1) {
          var Account_typeID = result[0].FK_Account_typeID;
          req.session.Account_typeID = Account_typeID; //admin
          req.session.username = username; //member
          res.redirect('/home');
        }

        if (results.length !== 1) {
          res.redirect('/');
        }

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
});

module.exports = router;