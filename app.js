//app.js

var express = require('express');
var path = require('path');
var url = require('url');
var users = require('./routes/users');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.end('Root Requested!');

});

app.use('/users', users);

// app.get('/users', (req, res)=>{
//   res.end('/sers Requested');
//
// });
//
// app.get('/users/:userid', (req, res)=>{
//   res.end(`/users Requested, userid ${req.params.userid}`);
// });

// app.get('/photos/:photoid', (req, res)=>{
//   res.end(`/photos Requested, photoid ${req.params.photoid}, format ${req.query.format} and size ${req.query.size}`);
// });



app.use((req, res)=>{
  res.status(404);
  res.redirect('/static/404page.html')
});




module.exports = app;
