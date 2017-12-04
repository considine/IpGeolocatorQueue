
var ee = require('event-emitter');
var rp = require("request-promise");
var querystring = require("querystring");
// limit 4 requests per second
const REQUEST_TIMEOUT = 250;
const BASE_URL = "http://freegeoip.net/json/";



function IpToPromise (ipaddress, oncomplete, onfailure) {
  this.ipaddress = ipaddress;
  this.oncomplete = oncomplete;
  this.onfailure = onfailure;
}

function IpQueue() {

  /**
   * List of ip addresses to retreive
   * @type {Array}
   */
  var ipQueue = [];
  var fetchingLock = false;
  /**
   * The last time
   * @type {long}
   */
  var lastFetch = new Date().getTime();

  /**
   * grabs item from queue, sets timeout. If queue is empty stops the timeout loop,
   * and removes the fetchingLock
   * @return {Object} object of location
   */
  function fetchingQueue () {
    // see if queue empty, if not get top
    if (ipQueue.length === 0) {
      fetchingLock = false;
      return;
    }

    var ipNext= ipQueue.pop();
    rp(BASE_URL + ipNext.ipaddress)
    .then((respJson) => {
      // do whatever with the respJson
      ipNext.oncomplete(respJson);
      // Now set timeot to run fetchingQuue again
      var now = new Date().getTime();
      var waitTime = (now > lastFetch + 250) ? 0 : lastFetch - now + 250;
      setTimeout(function() {
        lastFetch = new Date().getTime();
        fetchingQueue();
      }, waitTime);
    })
    .catch((e) => {
      ipNext.onfailure(e);
    });
  }
  /**
   * Gets an IP address
   * @param {String} newIpAddress the ip address we are searchign for
   * @return {[type]} [description]
   */
  this.fetchIp = function (newIpAddress) {
    newIpAddress = querystring.escape(newIpAddress);
    // add to queue, and start time outloop if not already going
    return new Promise(function(resolve, reject) {
      ipQueue.push(new IpToPromise(newIpAddress, resolve, reject));

      if (!fetchingLock) {
        fetchingLock  = true;
        fetchingQueue();
      }
    });

  }
}


module.exports = new IpQueue();
