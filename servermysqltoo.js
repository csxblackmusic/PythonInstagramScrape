const express = require("express"); //imports the express module
const app = express(); //creates the express application object
app.use(express.json());//allows you to say req.body and get the data sent in the body of the msg
app.use(express.static("public"));//register public as the directory for static files
app.use(express.urlencoded());////allows you to say req.body and get the data sent from a form

const mysql = require("mysql2");
const conn = mysql.createConnection(
{host:"localhost",user:"root",password:"N$be0668",database:"paws",port:3306});

conn.connect(function(err)
{
	if(err)
		console.log("Couldnt connect to MySQL",err);
	else
		console.log("Database connection established");
	
});

let qrows = {};
//prevents sql injection
let sql = "SELECT * from students WHERE gpa>= ? or fname = ?"; 
conn.query(sql,[4.0,"David"],function(err,rows)
{
	if(err)
		console.log("there was an error in your query",err);
	else
	{
		qrows = rows;
		console.log(rows);
	}	
});
app.listen(3000);