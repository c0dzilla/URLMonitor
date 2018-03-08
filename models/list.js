var db = require('../utils/db.js');
function List () {};

List.getUrls = () => {
  let instance = db.getInstance();
  return new Promise((resolve, reject) => {
    instance.collection('list').find({}).toArray((err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

List.getUrl = (id) => {
  let instance = db.getInstance();
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').findOne(query, (err, result) => {
      console.log(result);
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

List.addUrl = (urlObj) => {
  let instance = db.getInstance();
  return new Promise((resolve, reject) => {
    instance.collection('list').insertOne(urlObj, (err, result) => {
      if (err)
        reject(err);
      resolve();
    });
  });
}

List.deleteUrl = (id) => {
  let instance = db.getInstance();
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').deleteOne(query, (err, obj) => {
      if (err)
        reject(err);
      resolve();
    });
  })
}

module.exports = List;