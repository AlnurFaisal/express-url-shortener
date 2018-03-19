const atob = require("atob");

function decode(hash) {
  id = parseInt(atob(hash));
  console.log(id);
  return id + 10000;
}

module.exports = decode;
