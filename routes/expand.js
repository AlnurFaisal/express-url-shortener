const express = require("express");
const mongoose = require("mongoose");
const URLmap = require("../models/urlmap.js");
const router = express.Router();

// load data
const existingURLs = require("../data.js");

// load our own helper functions
const decode = require("../demo/decode");

router.get("/:hash", function(req, res) {
  const getHash = req.params.hash;
  // console.log(existingURLs);
  try {
    const getURL = decode(getHash, existingURLs);
    res.status(200).send({ url: getURL });
  } catch (e) {
    // console.log(e);
    res.status(404).send({
      message: `There is no long URL registered for hash value ${getHash}`
    });
  }
});

router.delete("/:hash", function(req, res) {
  const getHash = req.params.hash;
  const record = existingURLs.filter(
    existingURLs => existingURLs.hash === getHash
  );
  if (record.length !== 0) {
    existingURLs.splice(record[0].id - 1, 1);
    res
      .status(200)
      .send({ message: `URL with hash value ${getHash} deleted successfully` });
  } else {
    res
      .status(404)
      .send({ message: `URL with hash value ${getHash} does not exist` });
  }
});

module.exports = router;
