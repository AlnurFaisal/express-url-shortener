const express = require("express");
const mongoose = require("mongoose");
const URLmap = require("../models/urlmap");
const Counter = require("../models/counter");
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
          res.status(200).send({ urlshorten: record[0], message: "URL is already saved and its shortcode already generated." });
        } else {
            try {
                const counter = await Counter.findById('url_count');
                console.log(counter.count);
                const hashURL = encode(counter.count);
                const myUrl = new URLmap({
                    url: URL
                });
                const urlshorten = await myUrl.save();
                console.log("Saving and shortening url...");
                res.status(200).send({ urlshorten: hashURL,  message: "URL Shortened and saved to database." });
          } catch(err) {
              console.error(err);
              next(err);
          }
      }
  } catch(err){
      console.error(err);
      next(err);
  }
});

module.exports = router;
