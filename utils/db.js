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
