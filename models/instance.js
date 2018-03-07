const config = require('../config/config.json');
var MongoClient = require('mongodb').MongoClient;

var instance = null;

const dbInstance = async () => {
  if (instance !== null)
    return instance;
    MongoClient.connect(config.mongo.url, (err, db) => {
    if (err)
      throw err;
    console.log("Connected to server!");
    instance = db;
  });

  return instance;
}

module.exports = dbInstance;


