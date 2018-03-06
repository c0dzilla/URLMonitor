const config = require('config.json');
var MongoClient = require('mongodb').MongoClient;

const dbInstance = () => {
  let instance;

  MongoClient.connect(config.url, (err, db) => {
    if (err)
      throw err;
    instance = db.db(config.database);
  });

  return instance;
}

module.exports = 'dbInstance';


