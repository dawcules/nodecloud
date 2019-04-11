'use strict';

console.log('hello world');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.get('/', (req, res) => {
  res.send('Hello World');
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