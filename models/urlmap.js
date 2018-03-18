const mongoose = require("mongoose");
const Counter = require("./counter");
const urlmapSchema = new mongoose.Schema({
    _id: {type: Number},
    url: String,
    hash: String,
    created_at: {
        type: Date,
    }
});

urlmapSchema.pre('save', function(next) {
    console.log('running pre-save');
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
        if(err) return err;
        console.log(counter);
        console.log(counter.count);
        doc._id = counter.count;
        doc.created_at = new Date();
        console.log(doc);
        next();
    });
});

const URLmap = mongoose.model('URLmap', urlmapSchema);
module.exports = URLmap;