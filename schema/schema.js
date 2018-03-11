var schema = {
  _id: Number,
  url: String,
  method: String,
  headers: Object,
  data: Object,
  responses: {type: Array, default: []}
};

module.exports = schema;