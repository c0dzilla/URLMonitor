var HomeController = require('../controllers/homeController.js');
var UrlController = require('../controllers/serviceController.js');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  HomeController.listUrls(req, res);
});

router.post('/', (req, res) => {
  HomeController.addUrl(req, res);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  HomeController.getUrlData(req, res);
});

router.put('/:id', (req, res) => {
  HomeController.editUrl(req, res);
});

router.delete('/:id', (req, res) => {
  HomeController.deleteUrl(req, res);
});

module.exports = router;