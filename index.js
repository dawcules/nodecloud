'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const fs      = require('fs');
const https   = require('https');
const bodyParser = require('body-parser');
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};

passport.use(new LocalStrategy(
    (username, password, done) => {
      // Normally, select * from users where username=?
      if (username !=process.env.USR && password != process.env.PWD) {
        return done(null,false);
      }
      return done(null, {name: username});
    }
));
passport.serializeUser((user, done) => {
  done (null, user)
});

passport.deserializeUser((id, done) => {
  return user;
  });


console.log('hello world');




/*app.get('/', (req,res) => {

// simple query
  connection.query(
      ''SELECT * FROM `test`',
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.send(results);
      }
  );
});*/

app.get('/', (req,res) => {
  if (req.secure) res.send('https :)');
  else res.send('hello not secure?');
});

app.post('/', bodyParser.urlencoded({extended:true}), (req, res) => {
  console.log(req.body);
  res.send('POST: Hello ' + req.body.name);
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

app.get('/test', (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.query.name}!`);
});


app.listen(8000); //normal http traffic
https.createServer(options, app).listen(3000); //https traffic
