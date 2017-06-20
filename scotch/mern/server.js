const express = require('express');
const app = express();
var mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Connect to db
mongoose.connect('mongodb://test:test@ds131782.mlab.com:31782/mean', function(err, success){
    if (err) throw err;
});

// Configuration
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// define model
var Test = mongoose.model('mean', {
  text: String
});

app.get('/api/todos', function(req,res){
    Test.find({}, function(err, data){
      if (err) throw err;
      res.json(data);
    });
});

app.post('/api/todos', function(req,res){

  Test.create({
    text: req.body.text,
    done: false
  }, function(err, todos){
      if (err){
        res.send(err)
      };
      Test.find({}, function(err, data){
        if (err) throw err;
        res.json(data);
      });
  });

});

app.delete('/api/todos/:todo_id', function(req, res){
    Test.remove({_id : req.params.todo_id}, function(err,data){
      console.log("Data: ");

      if (err) throw err;
      console.log(data);

      Test.find({}, function(err, data){
        if (err) throw err;
        res.json(data);
      });
    });
  });

// application -------------------------------------------------------------
  app.get('/', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

// Listen
app.listen(5000);
console.log("Started app \n listening on port 5000");
