var Url = require('../models/url.js');
var List = require('../models/list.js');
var request = require('request');

function serviceController() {};
var services = {};

serviceController.startService = async (id) => {
  if (services[id])
    return;

  List.getUrl(id)
    .then((urlObj) => {
      services[id] = setInterval(request(urlObj, (err, res, body) => {
        if (!urlObj.responses)
          urlObj.responses = [];
        urlObj.responses.push(res.elapsedTime);
        Url.update(urlObj)
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          })
      })
      , 1000);
    })
    .catch(err => {
      console.log(err);
    })
}

serviceController.endService = (id) => {
  if (services[id]) {
    clearInterval(services[id]);
    delete services[id];
  }
}
/*
serviceController.restartService = (id) => {
  if (services[id]) {
    clearInterval(services[id]);
  }
}
*/
module.exports = serviceController;
