const express = require("express"); //imports the express module
const app = express(); //creates the express application object
app.use(express.static("public"));
const mysql = require("mysql2");
const crypt = require("crypto");

app.use(express.urlencoded());
const hashRounds = 1000;
const hashLength=64;
const salt = crypto.randomBytes(16).toString('hex');
const pass = process.env.PASS;
const conn = mysql.createConnection({host:"localhost",user:"djames56",password:pass,database:"test_schema",port:3306});


conn.connect(function(err)
{
	if(err)
		console.log("Couldnt connect to MySQL",err);
	else
		console.log("Database connection established");
	
});
conn.query(chk,function(err,rows)
{
	if(err)
		console.log("there was an error in your query",err);
	else
	{
		qrows = rows;
		console.log(qrows);
	}
});



/*
conn.query(sql,[4.0,"David"],function(err,rows)
{
	if(err)
		console.log("there was an error in your query",err);
	else
	{
		qrows = rows;
	}
});


app.get("/addstudent",function(req,res)
{
	fname= req.query.fname;
	lname= req.query.lname;
	gpa = req.query.gpa;
	sql = "insert into students (firstname,lastname,GPA) values(?,?,?)"; //query to insert a row into the students table
	conn.query(sql,[fname,lname,gpa],function(err,result)
	{
		if (err)
			console.log("There was an error inserting a student",err)
		else
			res.send("<p> You have inserted "+fname+" "+lname+" "+ "into " + result.affectedRows+" row </p>");
	});
});
*/
//
app.post("/login",function(req,res)
{
	let plainPass = req.body.password; 
	let username = req.body.username;
	const passHash = crypt.pbkdf2Sync(plainPass,
        salt, hashRounds, hashLength, `sha512`).toString(`hex`);
		console.log(passHash)
	/*
	let sql = "select * from user where username = ? and password =? "; //query to insert a row into the students table
	conn.query( sql,[username,passsHash],function(err,result)
	{
		if(err)
			res.send(err);
		else
		{
			if (results.length === 0)
			{
				res.send("<p>Your password or username are incorrect</p>");
			}
			else
			{
				res.send("<p>You're successfully logged in "+username+"!"+"</p>");
			}
		}
	});*/
	
});



app.listen(3000);