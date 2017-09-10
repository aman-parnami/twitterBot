var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Agenda = require('agenda');




var config = require('./config.js');
var agenda = require('./jobs.js')
var app = express();
var routes =require('./routes/index');

mongoose.connect('mongodb://localhost:27017/twit');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('connected correctly to db');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);



agenda.on('ready',function(){
    agenda.every('30 minutes','get tweets');
    agenda.start();
   // agenda.now('get tweets');
});







   


app.listen(8080,function(){
    console.log('app is listening on port 8080');
});

module.exports = app;