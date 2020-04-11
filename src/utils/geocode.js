const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidXRrYXNyaGc2IiwiYSI6ImNqdW1iMnl4dDBtb2U0M284cHZqcWhsa2wifQ.0bXgQ0iCCJZTCa90OjRlsg&limit=1";

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation services!", undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location", undefined);
    } else {
      const feature = body.features[0];
      callback(undefined, {
        latitude: feature.center[1],
        longitude: feature.center[0],
        place_name: feature.place_name,
      });
    }
  });
};

module.exports = geocode;
