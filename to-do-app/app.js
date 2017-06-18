var express = require('express');
var todocontroller = require('./controllers/todoController')

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Set up static files
app.use(express.static('./public'));

// fire controllers
todocontroller(app);

// listen to port
app.listen(3000);
console.log("Listening to port 3000\n");
