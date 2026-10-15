const express = require("express"); //imports the express module
const app = express(); //creates the express application object
app.use(express.static("public"));
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
app.use(express.urlencoded());
const saltRounds = 10;
const pass = process.env.PASS;
const conn = mysql.createConnection({host:"localhost",user:"djames56",password:pass,database:"test_schema",port:3306});
let sql = "SELECT * from student WHERE gpa>= ? or firstname = ?"; //prevents sql injection
let chk = "SELECT * from student;" 
bcrypt.genSalt(saltRounds, (err, salt) => {
if (err) {
    // Handle error
    return;
}

// Salt generation successful, proceed to hash the password
});
let salt = 'd@vi!d';
const userPassword = 'user_password'; // Replace with the actual password
bcrypt.hash(userPassword, salt, (err, hash) => {
    if (err) {
        // Handle error
        return;
    }

// Hashing successful, 'hash' contains the hashed password
console.log('Hashed password:', hash);
});


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
app.post("/addstudent",function(req,res)
{
	let fname = req.body.fname; 
	let lname = req.body.lname;
	let gpa = req.body.gpa;
	const userPassword = 'student'; // Replace with the actual password
	bcrypt.hash(userPassword, salt, (err, hash) => 
	{
		if (err) 
		{
			// Handle error
			return;
		}
		let sql = "insert into students (firstname,lastname,GPA,password) values(?,?,?,?)"; //query to insert a row into the students table
		conn.query( sql,[fname,lname,gpa,hash],function(err,result)
		{
			if(err)
				res.send(err);
			else
			{
				res.send("<p>Inserted "+result.fname+" "+result.lname+" into "+result.affectedRows+" rows</p>");
			}
		});
	});
});



app.listen(3000);