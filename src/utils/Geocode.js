const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWtwMDQyIiwiYSI6ImNrZTVnMTI4cjBhcWwyeXIzem9ldHg1M2IifQ.06RV9vchhTbzkqSjstPF0g";

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to Connect", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        PlaceName: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
