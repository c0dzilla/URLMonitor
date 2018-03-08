/*
* Purpose: Ensure already created db instance is used
*/
function db () {};

var instance = null;

db.getInstance = () => {
  return instance;
}

db.setInstance = (db) => {
  instance = db;
}

module.exports = db;

/*
var instance = null;

 dbInstance = async () => {
  if (instance !== null)
    return instance;
  await createConnection();
  console.log(instance);
  return instance;
}

function createConnection() {
  MongoClient.connect(config.mongo.url, (err, db) => {
    if (err)
      throw err;
    console.log("Connected to server!");
    instance = db;
  });
}

var instance = null;

function db () {};

db.createConnection = () => {
  MongoClient.connect(config.mongo.url, (err, db) => {
    if (err)
      throw err;
    console.log("Connected to database!");
    instance = db.db("urlmonitor");
  });
}

db.getInstance = () => {
  if (instance !== null)
    return instance;
  return db.createConnection();
}


module.exports = db;
*/