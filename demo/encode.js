const btoa = require("btoa");

function encode(URLs) {
  return btoa(URLs.length);
}

module.exports = encode;
