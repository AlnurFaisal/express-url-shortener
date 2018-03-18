if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
const app = require("./app");
const mongoose = require("mongoose");
const Counter = require("./models/counter");

mongoose.connect(process.env.MONGODB_URI, function(err) {
  if (err) throw err;
  console.log("Database connected successfully");
  let counter = new Counter({ _id: "url_count", count: 10000 });
  counter.save(function(err) {
    if (err) return console.error(err);
    console.log("counter inserted");
  });

  const server = app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening on port ${server.address().port}...`);
  });
});
