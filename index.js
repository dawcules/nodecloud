'use strict';
require('dotenv').config();
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


console.log('hello world');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.get('/', (req,res) => {

// simple query
  connection.query(
      'SELECT * FROM `test`',
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.send(results);
      }
  );
});
app.post('/', bodyParser.urlencoded({extended:true}), (req, res) => {
  console.log(req.body);
  res.send('POST: Hello ' + req.body.name);
});

app.get('/test', (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.query.name}!`);
});


app.listen(3000);
