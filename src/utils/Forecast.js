const request = require("request");

const forecast = (x, y, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    y +
    "&lon=" +
    x +
    "&appid=de60c8f13523bda342d545e4cf2e0268";

  request({ url: url }, (error, { body } = {}) => {
    if (error) {
      callback("Cannot connect to API", undefined);
    } else {
      const data = JSON.parse(body);
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
