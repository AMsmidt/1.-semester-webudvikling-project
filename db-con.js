/*let mysql = require('mysql');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dkkdb"
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
   
    console.log('Connected to the MySQL server.');
  });*/

 /* var mysql = require('mysql');

 var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'dkkdb'
 });

 connection.connect( function(err){
if (err){ 
    throw err;
}
else {
    console.log('Connected');
}
 });*/

let mysql = require('mysql');
  
  const con = mysql.createConnection({
   host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'dkkdb'
  });

  con.connect( function(err){
    if (err){ 
        throw err;
    }
    else {
        console.log('Connected');
    }
  });

module.exports = con;