const con = require('../db-con');
const express = require('express');
const router = express.Router();
let sql = require('mysql');
const path = require('path');
var i = 0;

router.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname, title: 'Express '+ req.session.username, id: 'home' });
});



module.exports = router;