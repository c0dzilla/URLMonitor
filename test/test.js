var expect = require('chai').expect;
var request = require('request');
var config = require('../config/config.json');
let urlObj = {
  url: config.url + ":" + (config.port || 4321),
};

describe('Url Monitor API', () => {

  describe('Ping root url', () => {

    it('returns status 200', (done) => {
      urlObj.method = "get";
      request(urlObj, (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        delete urlObj.method;
        done();
      });
    });

  });

  describe('Post a url', () => {

    it('returns post response', (done) => {
      urlObj.method = "post";
      urlObj.form = {
        url: "https://www.google.com",
        data: "{'a', 'b'}",
        method: "get"
      }
      request(urlObj, (err, response, body) => {
        body = JSON.parse(body);
        expect(body.url).to.equal(urlObj.form.url);
        expect(body.data).to.equal(urlObj.form.data);
        expect(body.method).to.equal(urlObj.form.method);
        delete urlObj.method;
        delete urlObj.form;
        done();
      })
    })

  })

});