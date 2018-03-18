const atob = require("atob");

function decode(hash) {
  id = atob(hash);
  return id + 10000;
}

module.exports = decode;
