const List = require('../models/list.js');
const Url = require('../models/url.js');
const ServiceController = require('./serviceController.js');

function homeController () {};

homeController.listUrls = (req, res) => {
  List.getUrls()
    .then(result => {
      //res.render('home', result);
      res.send('cool');
    })
    .catch(err => {
      console.log(err);
      //res.redirect('/');
    })
}

homeController.addUrl = (req, res) => {
  // TODO: Generate truly unique id
  const id = Math.random()*100;
  const urlObj = {
    _id: id,
    url: req.body.url,
    data: req.body.data,
    method: req.body.method,
    headers: req.body.headers
  }
  List.addUrl(urlObj)
  .then(() => {
    ServiceController.startService(id);
  })
  .catch(err => {
    res.redirect('/');
  })
}

homeController.deleteUrl = (req, res, id) => {
  List.deleteUrl(id)
    .then(() => {
      ServiceController.endService(id);
    })
    .catch(err => {
      res.redirect('/');
    })
}

homeController.editUrl = (req, res, id) => {
  const urlObj = {
    _id: id,
    url: req.body.url,
    data: req.body.data,
    method: req.body.method,
    headers: req.body.headers
  }
  List.updateUrl(id, urlObj)
    .then(() => {
      ServiceController.endService(id);
      ServiceController.startService(id);
    })
    .catch(err => {
      res.redirect('/');
    });
}

module.exports = homeController;
