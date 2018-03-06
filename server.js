var express = require('express');
var homeController = require('/controllers/homeController.js');
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
  urlController.getUrlData(req, res, id);
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  urlController.editUrl(req, res, id);
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  urlController.deleteUrl(req, res, id);
});
