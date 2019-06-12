const mysqlCred = require('../config/index').mysqlCred;
const mysql = require('mysql');
const mysqlBackbone = require('mysql-backbone');

 const connection = mysql.createConnection({
  host     : 'localhost',
  user     : mysqlCred.mysqlUser,
  password : mysqlCred.mysqlPass,
  database : mysqlCred.mysqlDB,
});

connection.connect();


module.exports={
   
}