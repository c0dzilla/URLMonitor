var expect = require('chai').expect;
var request = require('request');
var config = require('../config/config.json');
let urlObj = {
  url: config.url + ":" + (config.port || 4321),
};

describe('Url Monitor API', () => {

  describe('Ping root url', () => {

    it('returns status 200', () => {
      urlObj.method = "get";
      request(urlObj, (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        delete urlObj.method;
        done();
      });
    });

  });

  describe('Post a url', () => {

    it('returns post response', () => {
      urlObj.method = "post";
      urlObj.form = {
        url: "https://www.google.com",
        data: "{'a', 'b'}",
        method: "get"
      }
      request(urlObj, (err, response, body) => {
        expect(body.url).to.equal(urlObj.body.url);
        expect(body.data).to.equal(urlObj.body.data);
        expect(body.method).to.equal(urlObj.body.method);
        delete urlObj.method;
        delete urlObj.form;
        done();
      })
    })

  })

});