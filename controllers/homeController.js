const List = require('../models/list.js');
const Url = require('../models/url.js');
const ServiceController = require('./serviceController.js');
const Percentile = require('../utils/percentile.js');
const crypto = require('crypto');

function homeController () {};

homeController.handleStartup = () => {
  List.getUrls()
    .then(urls => {
      for (url of urls) {
        ServiceController.startService(url._id);
      }
    })
    .catch(err => {
      console.log(err);
    })
}

homeController.listUrls = (req, res) => {
  List.getUrls()
    .then(urls => {
      res.send(urls);
    })
    .catch(err => {
      console.log(err);
    })
}

homeController.addUrl = (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
  const urlObj = {
    _id: id,
    url: req.body.url,
    data: req.body.data,
    method: req.body.method,
    headers: req.body.headers
  }
  List.addUrl(urlObj)
    .then(result => {
      ServiceController.startService(id);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result.ops[0]));
    })
    .catch(err => {
      console.log(err);
    })
}

homeController.deleteUrl = (req, res) => {
  const id = req.params.id;
  List.deleteUrl(id)
    .then(result => {
      ServiceController.endService(id);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    })
}

homeController.editUrl = (req, res) => {
  const id = req.params.id;
  const urlObj = {
    _id: id,
    url: req.body.url,
    data: req.body.data,
    method: req.body.method,
    headers: req.body.headers
  }
  Url.update(id, urlObj)
    .then(result => {
      ServiceController.endService(id);
      ServiceController.startService(id);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
}

homeController.getUrlData = (req, res) => {
  const id = req.params.id;
  List.getUrl(id)
    .then(urlData => {
      // id was never assigned or monitoring has been stopped
      if (!urlData) {
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({ success: false }));
      }
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
