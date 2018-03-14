const express = require("express");
const router = express.Router();

router.post("/shorten-url", function(req, res, next) {
  const URL = req.body.url;
  const record = existingURLs.filter(existingURLs => existingURLs.url === URL);
  if (record.length !== 0) {
    res.status(200).send({ url: record[0].hash });
  } else {
    const hashURL = encode(URL, existingURLs);
    const myUrl = {
      id: (existingURLs.length + 1).toString(),
      url: URL,
      hash: hashURL
    };
    existingURLs.push(myUrl);
    res.status(200).send({ hash: myUrl.hash });
  }
});

module.exports = router;
