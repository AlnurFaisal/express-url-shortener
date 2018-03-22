const btoa = require("btoa");

function encode(counter) {
  // check the counter increment value and use it to encode
  let arr  = [];
  let newCounter = counter.toString()
  arr = newCounter.split("");
  newCounter = parseInt(arr[arr.length-1]);
  console.log(newCounter);
  return btoa(newCounter);
}

module.exports = encode;
