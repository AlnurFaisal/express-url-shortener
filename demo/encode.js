const btoa = require("btoa");

function encode(url, URLs) {
  return btoa(URLs.length);
}

module.exports = encode;
