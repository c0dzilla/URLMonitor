var db = require('../utils/db.js');
function Url () {};

Url.update = (id, urlObj) => {
  let instance = db.getInstance();
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').replaceOne(query, urlObj, (err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

module.exports = Url;