var geolocator = require("../app/ipqueue");
var querystring = require("querystring");

var testIp = "34.210.82.133";
var testWebsite =  "koptional.com";

describe("Ip Queue", function () {
  describe("#fetchIp", function () {

      it('should return results for ip requests', function (done) {
        geolocator.fetchIp(testIp).then((results) => {
          done();
        })
        .catch((e) => {
          done(e);
        });
      });

      it ("should return results for website requests", function (done) {
        geolocator.fetchIp(testWebsite).then((results) => {
          done();
        })
        .catch((e) => {
          done(e);
        });
      });

  });
});
