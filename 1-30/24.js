var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('This is the home page');
});

app.get('/contact', function(req, res){
  res.send('This is the contact page');
});

app.get('/profile/:id', function(req, res){

    res.send("You requested to see with the id of : " + req.params.id);

});

app.listen(3000);
