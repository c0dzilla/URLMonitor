//const instance = require('./instance.js')();

function Url () {};

Url.update = (id, urlObj) => {
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').updateOne(query, myObj, (err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

module.exports = Url;