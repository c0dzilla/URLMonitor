var expect = require('chai').expect;
var request = require('request');
var config = require('../config/config.json');
let urlObj = {
  url: config.url + ":" + (config.port || 4321),
  method: "get"
};

describe('Url Monitor API', () => {

  describe('Ping root url', () => {

    it('returns status 200', () => {
      request(urlObj, (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        console.log("pass");
        done();
      });
    });
  
  });

});