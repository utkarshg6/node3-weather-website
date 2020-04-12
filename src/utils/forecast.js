const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastURL =
    "https://api.darksky.net/forecast/b7d43c38d31ec5e26766f6839485520e/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service.", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const currently = body.currently;
      const daily = body.daily.data[0];
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: currently.temperature,
        precipProbability: currently.precipProbability,
        temperatureHigh: daily.temperatureHigh,
        temperatureLow: daily.temperatureLow,
      });
    }
  });
};

module.exports = forecast;
