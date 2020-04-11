const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Utkarsh Gupta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Utkarsh Gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Utkarsh Gupta",
    message: "This is the help page.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  message = {};
  message["address"] = req.query.address;

  geocode(
    req.query.address,
    (error, { latitude, longitude, place_name } = {}) => {
      if (error) {
        message["error"] = error;
        return res.send(message);
      }

      message["location"] = place_name;
      // console.log(place_name);
      forecast(
        latitude,
        longitude,
        (error, { summary, temperature, precipProbability } = {}) => {
          if (error) {
            message["error"] = error;
            return res.send(message);
            // return console.log("Error in Forecast:", error);
          }
          message["forecast"] =
            summary +
            " The temperatue is " +
            temperature +
            "°C and a " +
            precipProbability +
            "% chance of rain.";
          return res.send(message);
        }
      );
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Utkarsh Gupta",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Utkarsh Gupta",
  });
});

app.listen(3000, () => {
  console.log("Server is up on Port 3000.");
});
