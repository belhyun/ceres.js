var mysql = require('mysql');
var data = {
  host     : 'localhost',
  user     : 'root',
  password : 'whdgus2',
  database : 'study'
};
var connection = mysql.createConnection(data);
var pool = mysql.createPool(data);
var queryFormat = function(query,values){
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};
exports.pool = pool;
exports.queryFormat = queryFormat;
