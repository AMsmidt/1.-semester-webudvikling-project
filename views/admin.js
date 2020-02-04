const con = require('../db-con');
const express = require('express');
const router = express.Router();
let sql = require('mysql');
const path = require('path');
var i = 0;

router.use(express.static(path.join('public')));
router.use("/styles",  express.static('public/css'));
router.use("/scripts", express.static('public/js'));

router.get('/', function (req, res) {
    res.sendFile('admin.html', {root: __dirname, title: 'Admin', id: 'Admin' + req.session.username})
});



module.exports = router;