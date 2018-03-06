const instance = require('instance.js');

function List = {};

List.listUrls = () => {
  return new Promise((resolve, reject) => {
    instance.collection('list').find({}).toArray((err, result) => {
      if (err)
        throw err;
    });
    resolve(result);
  });
}

List.addUrl = (urlObj) => {
  return new Promise((resolve, reject) => {
    instance.collection('list').insertOne((urlObj), () => {
      if (err)
        throw err;
    });
    resolve();
  });
}

List.deleteUrl = ((id) => {
  const query = { _id : id };
  return new Promise((resolve, reject) => {
    instance.collection('list').deleteOne(query, ((err, obj) => {
      if (err)
        throw err;
      resolve();
    });
  })
})