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
      let reqObj = urlObj;
      reqObj.time = true;
      services[id] = setInterval(() => {request(reqObj, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!urlObj.responses)
          urlObj.responses = [];
        if (urlObj.responses.length == 100)
          urlObj.responses.shift();
        urlObj.responses.push(res.elapsedTime);
        console.log(res.elapsedTime);
        Url.update(id, urlObj)
          .then(result => {
          })
          .catch(err => {
            console.log(err);
          })
      })
      }, 1000);
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

module.exports = serviceController;
