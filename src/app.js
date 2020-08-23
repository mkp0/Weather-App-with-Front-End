const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/Forecast");
const geocode = require("./utils/Geocode");

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "/templets/views");
const partialsPath = path.join(__dirname, "/templets/partials");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
//Changing view directory to new directory i.e viewPath which is points to templets
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Masum Paswan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send([{ error: "Error!! Please enter city name" }]);
  }
  geocode(req.query.city, (err, data1) => {
    if (err) {
      res.send([{ error: err }]);
      return;
    }
    forecast(data1.latitude, data1.longitude, (error, data) => {
      if (err) {
        res.send({ error: error });
        return;
      }
      res.send({
        Place: data1.PlaceName,
        Weather: data.weather[0].description,
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Masum Paswan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Masum Paswan",
  });
});

// app.get("/product", (req, res) => {
//   console.log(req.query);
//   res.send({ products: [] });
// });

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Masum Paswan",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is Running in Port : " + 3000);
});
