const express = require("express");
const bodyParser = require("body-parser");

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

const app = express();
app.use(bodyParser.json());

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];
let counter = 3;

// TODO: Implement functionalities specified in README
app.post("/shorten-url", function(req, res) {
    const getURL = req.body.url;
    const record = existingURLs.filter(existingURLs => existingURLs.url === getURL);
    if(record.length !== 0){
      res.status(200).send({"url": record[0].hash});
    } else{
      const hashURL = encode(counter, existingURLs);
      const myUrl = {"id": counter, "url": getURL, "hash": hashURL};
      existingURLs.push(myUrl);
      counter++;
      res.status(200).send({"url": myUrl.hash});
    }
});

app.get("/expand-url/:hash", function(req, res){
    const getHash = req.params.hash;
    try {
      const getURL = decode(getHash, existingURLs);
      res.status(200).send({"url": getURL});
    } catch(e){
      res.status(404).send({"message":`There is no long URL registered for hash value ${getHash}`});
    }
});

app.delete("/expand-url/:hash", function(req, res){
  const getHash = req.params.hash;
  const record = existingURLs.filter(existingURLs => existingURLs.hash === getHash);
  if(record.length !== 0){
    existingURLs.splice(record[0].id-1, 1);
    res.status(200).send({"message": `URL with hash value ${getHash} deleted successfully`});
  } else {
    res.status(404).send({"message": `URL with hash value ${getHash} does not exist`});
  }
});

app.get("/:hash", function(req, res){
  const getHash = req.params.hash;
  try {
    const getURL = decode(getHash, existingURLs);
    res.redirect(`http://${getURL}`);
  } catch(e){
    res.status(404).send({"message":`There is no long URL registered for hash value ${getHash}`});
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
