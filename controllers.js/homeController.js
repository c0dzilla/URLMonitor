const List = require('../models/list.js');
const ServiceController = require('serviceController.js');

function homeController = {};

homeController.listUrls = (req, res) => {
  List.getUrls()
    .then(result => {
      res.render('home', result);
    });
    .catch(err => {
      res.redirect('/');
    })
}

homeController.addUrl = (req, res) => {
  const urlObj = {
    url: req.body.url,
    data: req.body.data,
    method: req.body.method,
    headers: req.body.headers
  }
  List.addUrl(urlObj)
  .then(result => {
    ServiceController.startService(url);
  });
  .catch(err => {
    res.redirect('/');
  })
}