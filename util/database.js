var mysql = require('mysql');

// Setup for mysql connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mindfire"
  });
   con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); 
  
module.exports = con;
 
    