var express = require('express');
var HomeController = require('./controllers/homeController.js');
var UrlController = require('./controllers/urlController.js');
var config = require('config.json')

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(config.port || 3000);

app.get('/', (req, res) => {
  HomeController.listurls(req, res);
});

app.post('/', (req, res) => {
  HomeController.addurl(req, res);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  UrlController.getUrlData(req, res, id);
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  UrlController.updateUrl(req, res, id);
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  UrlController.deleteUrl(req, res, id);
});
