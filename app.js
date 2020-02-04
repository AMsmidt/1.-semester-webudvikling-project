const conn = require('./db-con'); //connection to db
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const getdog = require('./routes/dog');
const login = require('./routes/login');
const getmating = require('./routes/mating');

const home = require('./views/home');
const mating = require('./views/mating');
const admin = require('./views/admin');

var session = require('express-session');


app.use(express.static(path.join('public')));
app.use("/styles",  express.static('public/css'));
app.use("/scripts", express.static('public/js'));

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'secret'
}));

/* login as member or admin */
function restrict(req, res, next) {
	console.log(req.session.username);
	// body...
	if (req.session.username) {
	  next();
	} else {
	  res.redirect('/');
	}
}

function adminRestrict(req, res, next) {
	console.log(req.session.Account_typeID);
	if (req.session.Account_typeID == 2) {
	  next();
	} else {
	  res.redirect('/');
	}
}

/* logout*/
app.get('/logout', function(req, res, next) {
	if (req.session) {
	  // delete session object
	  req.session.destroy(function(err) {
		if(err) {
		  return next(err);
		} else {
		  return res.redirect('/');
		}
	  });
	}
  });


app.use(express.json());
app.use(cors());
app.use('/getmating', restrict, getmating);
app.use('/getdog', restrict, getdog);

app.use('/', login);
app.use('/home', restrict, home);
app.use('/mating', restrict, mating);
app.use('/admin', adminRestrict, admin);


var server = app.listen(3003, function () {
	console.log('Server is running.. on Port [3003]');
});