var expect = require('chai').expect;
var request = require('request');
var config = require('../config/config.json');
const rootUrl = config.url + ":" + (config.port || 4321);

describe('Url Monitor API', () => {

  describe('Get /', () => {
    let urlObj = {
      url: rootUrl,
      method: "get"
    }

    it('returns status 200', (done) => {
      request(urlObj, (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('returns array of url objects', (done) => {
      request(urlObj, (err, response, body) => {
        body = JSON.parse(body);
        // array of urls
        expect(body).to.be.a('array');
        done();
      })
    })
  });

  describe('get url data', () => {
    let urlObj = {
      url: rootUrl + "/",
      method: "get"
    }
console.log(urlObj);
    describe('request invalid url', () => {
      urlObj.url += 'dummy_invalid_id';
      // even though invalid url, request is handled
      it('returns status 200', (done) => {
        request(urlObj, (err, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        })
      })

      it('returns success false', (done) => {
        request(urlObj, (err, response, body) => {
          body = JSON.parse(body);
          expect(body.success).to.equal(false);
          done();
        })
      })
    })
  })

  describe('Post a url', () => {
    let urlObj = {
      url: rootUrl + "/",
      method: "post",
      form: {
        url: "https://www.google.com",
        data: "{'a', 'b'}",
        method: "get",
        headers: "{'content-type': 'application/x-www-form-urlencoded'}"
      }
    }

    it('returns post response', (done) => {
      request(urlObj, (err, response, body) => {
        body = JSON.parse(body);
        // checking keys
        expect(body).to.have.property('url');
        expect(body).to.have.property('data');
        expect(body).to.have.property('method');
        expect(body).to.have.property('headers');
        // checking values
        expect(body.url).to.equal(urlObj.form.url);
        expect(body.data).to.equal(urlObj.form.data);
        expect(body.method).to.equal(urlObj.form.method);
        expect(body.headers).to.equal(urlObj.form.headers);
        done();
      })
    })
  })
});