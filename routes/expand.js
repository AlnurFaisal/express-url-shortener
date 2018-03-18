const express = require("express");
const mongoose = require("mongoose");
const URLmap = require("../models/urlmap.js");
const router = express.Router();

// load our own helper functions
const decode = require("../demo/decode");

router.get("/:hash", async function(req, res, next) {
  const getHash = req.params.hash;
  const getID = decode(getHash);
  try {
    const record = await URLmap.findById(getID);
    if(record){
      res.status(200).send({ urlexpand: record, message: `Full url for ${getHash}.` });
    } else {
      res.status(404).send({ message: `URL with hash value ${getHash} does not exist.` });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/:hash", async function(req, res, next) {
  const getHash = req.params.hash;
  const getID = decode(getHash);
  try{
    const record = await URLmap.findByIdAndRemove(getID);
    res.status(200).send({ message: `URL with hash value ${getHash} deleted successfully.` });
  } catch(e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
