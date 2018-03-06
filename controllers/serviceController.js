var Url = require('../models/url.js');
var List = require('../models/list.js');

serviceController = {};

serviceController.startService = (id) => {
  List.getUrl(id)
    .then((urlObj) => {
      
    })
    .catch(() => {
      res.redirect('/');
    })
}

serviceController.endService = (id) => {

}

serviceController.restartService = (id) => {

}