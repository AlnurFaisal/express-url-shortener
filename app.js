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
app.get("/", function() {
  res.status(200).send(`How to use the URL Shortner`);
});

app.get("/:hash", async function(req, res, next) {
  const getHash = req.params.hash;
  try {
    const getID = decode(getHash);
    const getURL = await URLmap.findById(getID);
    console.log("Checking URL shortcode...");
    if(getURL){
      res.redirect(`http://${getURL.url}`);
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
