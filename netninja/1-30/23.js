var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('This is the home page');
});

app.get('/contact', function(req, res){
  res.send('This is the home page');
});

app.listen(3000);
