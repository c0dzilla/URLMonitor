const instance = require('./instance.js')();

function List () {};

List.getUrls = () => {
  return new Promise((resolve, reject) => {
    console.log(instance);
    instance.collection('list').find({}).toArray((err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

List.getUrl = (id) => {
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').findOne(query).toArray((err, result) => {
      if (err)
        reject(err);
      resolve(result);
    });
  });
}

List.addUrl = (urlObj) => {
  return new Promise((resolve, reject) => {
    instance.collection('list').insertOne((urlObj), () => {
      if (err)
        reject(err);
      resolve();
    });
  });
}

List.deleteUrl = (id) => {
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