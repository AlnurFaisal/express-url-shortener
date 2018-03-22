const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const URLmap = require("./models/urlmap.js");

// load our own helper functions
const decode = require("./demo/decode");

// load multiple routers
const expandRouter = require("./routes/expand");
const shortenRouter = require("./routes/shorten");

const app = express();
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/expand-url", expandRouter);
app.use("/shorten-url", shortenRouter);

// TODO: Implement functionalities specified in README
app.get("/", function(err, req, res, next) {
  if(err){
    console.error(err);
    next(err);
  } else {
    res.status(200).send(
      `How to use the URL Shortner? Below are the steps:\n
      1) Make sure you have applications like Postman or Insomnia installed so you can make POST request via JSON. \n
      2) Launch either Postman or Insomnia and use the following url to make diffrent HTTP request as stated below: \n
         - Submit new URL on the body via JSON to receieve a shortcode(POST): https://alnur-short-url.herokuapp.com/shorten-url\n
         - Search for a particular shortcode if it exist(GET): https://alnur-short-url.herokuapp.com/expand-url/YOUR URL SHORTCODE\n
         - Serach for all URL that is stored in the database(GET): https://alnur-short-url.herokuapp.com/shorten-url/\n
         - Redirect to the correct website based on the correct URL shortcode provided(GET): https://alnur-short-url.herokuapp.com/YOUR URL SHORTCODE\n
         - Delete URL from database by passing the URL shortcode(DELETE): https://alnur-short-url.herokuapp.com/expand-url/YOUR URL SHORTCODE`
    );
  }
});

app.get("/:hash", async function(req, res, next) {
  const getHash = req.params.hash;
  try {
    const getID = decode(getHash);
    const getURL = await URLmap.findById(getID);
    console.log("Checking URL shortcode...");
    if(getURL){
      res.redirect(`${getURL.url}`);
    } else {
      res.status(404).send({
        message: `There is no long URL registered for hash value ${getHash}`
      });   
    }
  } catch(e) {
      console.error(e);
      next(e);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
