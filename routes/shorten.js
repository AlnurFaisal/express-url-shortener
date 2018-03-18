const express = require("express");
const mongoose = require("mongoose");
const URLmap = require("../models/urlmap.js");
const Counter = require("../models/counter.js");
const router = express.Router();

// load our own helper functions
const encode = require("../demo/encode");

router.get("/", async function(req, res, next){
  try{
    // list all url and its shortcode
    const existingURLs = await URLmap.find({});
    res.status(200).json(existingURLs);
  } catch(err){
      console.log(err);
      next(err);
  }

});

router.post("/", async function(req, res, next) {
  const URL = req.body.url;
  try {
      const existingURLs = await URLmap.find({});
      const record = existingURLs.filter(existingURLs => existingURLs.url === URL);
      if (record.length !== 0) {
        res.status(200).send({ url: record[0].hash });
      } else {
          const hashURL = encode(URL, existingURLs);
          try {
              const counter = await Counter.getNextSequence("counter");
              const myUrl = new URLmap({
                id: counter,
                url: URL,
                hash: hashURL
              });
              const urlshorten = await myUrl.save();
              console.log("Saving and shortening url...");
              res.status(200).send({ urlshorten: urlshorten,  message: "URL Shortened and saved to database" });
          } catch(err) {
              console.log(err);
              next(err);
          }
      }
  } catch(err){
      console.log(err);
      next(err);
  }
});

module.exports = router;
