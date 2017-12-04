# IpGeolocatorQueue
Allows you to request as many locations by IP as you want from freegeoip.net, and make use of the locations via promise. This package manages the queue to ensure you don't exceed the limit of 15,000 per hour by spacing out your requests

This uses the [FreeGoip](http://freegeoip.net/json/ "FreeGoip") API, and spaces out requests so you're queue will simply keep growing if your rate is faster than 15,000 per hour

This library is really useful for encapsulating all concerns with the rate limit. The FreeGoip results are generally pretty good
and will usually generate results within a hundred miles

## Installation
```
npm install geolocator-promise-queue
```



## Usage

```javascript
var geolocator = require("geolocator-promise-queue");
geolocator.fetchIp('34.210.82.133').then((results) => {
   console.log("The geolocation information is: " + results);
})
.catch((e) => {
 console.log("Error saving geolocation" + e);
});


// Or with websites:
geolocator.fetchIp('https://koptional.com').then((results) => {
   console.log("The geolocation information is: " + results);
})
.catch((e) => {
 console.log("Error saving geolocation" + e);
});

```




## Testing
```
npm test
```



## License

Copyright 2017 k-optional software

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
