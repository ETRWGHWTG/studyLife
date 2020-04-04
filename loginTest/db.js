var mysql = require("mysql");
var addfun = require("./add");
var selectfun = require("./select");
var connection = mysql.createConnection({
	host 		:"localhost",
	user 		:"root",
	password 	:"",
	database	:"shopTest"
});
connection.connect();
addfun.add(connection,"asdfajk","asdfas");
connection.end();