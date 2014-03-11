var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'whdgus2',
    database : 'study'
});
exports.connection = connection;
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'whdgus2',
    database: 'study'
});
