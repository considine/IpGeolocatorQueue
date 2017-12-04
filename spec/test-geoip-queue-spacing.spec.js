var geolocator = require("../app/ipqueue");
var querystring = require("querystring");

var testIp = "34.210.82.133";
var testWebsite =  "koptional.com";

describe("Ip Queue", function () {
  describe("#fetchIp", function () {
      it("should space out ip requests 250 milliseconds apart", function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
        var iters = 10; var i =0;
        setTimeout(function () {
          geolocator.clearQueue();
          done();
        }, 250 * iters);
        while (i < iters) {
          geolocator.fetchIp(testIp).then((res) => {}).catch((e) => done(e));
          i++;

        }

        geolocator.fetchIp(testIp).then((res) => {

          done(new Error("finished ahead of rate!!"));
        }).catch((e) => done(e));
      });

    })
  });
