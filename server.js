var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config/config.json');
var db = require('./utils/db.js');
var router = require('./routes/routes.js');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.port || 4321);

MongoClient.connect(config.mongo.url, (err, database) => {
  db.setInstance(database.db(config.mongo.db));
  app.use('/', router);
})
