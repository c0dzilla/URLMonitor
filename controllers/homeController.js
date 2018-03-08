const List = require('../models/list.js');
const Url = require('../models/url.js');
const ServiceController = require('./serviceController.js');
const Percentile = require('../utils/percentile.js');

function homeController () {};

homeController.listUrls = (req, res) => {
  List.getUrls()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
}

homeController.addUrl = (req, res) => {
  console.log(req.body);
  // TODO: Generate truly unique id
  const id = parseInt(Math.random()*100);
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
    res.send('added');
  })
  .catch(err => {
    res.redirect('/');
  })
}

homeController.deleteUrl = (req, res, id) => {
  List.deleteUrl(id)
    .then(() => {
      ServiceController.endService(id);
      res.send("deleted");
    })
    .catch(err => {
      console.log(err);
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

homeController.getUrlData = (req, res, id) => {
  List.getUrl(id)
    .then(urlData => {
      const percentileQueries = [50, 75, 95, 99];
      let percentileResults = [];
      percentileQueries.forEach((query) => {
        percentileResults.push(Percentile.calculate(urlData.responses, query));
      })
      urlData.percentile = percentileResults;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(urlData));
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = homeController;
