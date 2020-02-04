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
