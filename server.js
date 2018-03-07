var express = require('express');
var bodyParser = require('body-parser');
var HomeController = require('./controllers/homeController.js');
var UrlController = require('./controllers/serviceController.js');
var config = require('./config/config.json');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(config.port || 3000);

app.get('/', (req, res) => {
  HomeController.listUrls(req, res);
});

app.post('/', (req, res) => {
  HomeController.addUrl(req, res);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  HomeController.getUrlData(req, res, id);
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  HomeController.editUrl(req, res, id);
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  HomeController.deleteUrl(req, res, id);
});
