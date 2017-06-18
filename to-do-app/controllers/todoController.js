var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect('mongodb://test:test@ds131492.mlab.com:31492/todo')

// Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item:'walk dog'}, {item:'Kick ass'}]
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser,function(req, res){
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    });

  });

};
