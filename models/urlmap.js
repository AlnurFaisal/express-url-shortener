const mongoose = require("mongoose");
const urlmapSchema = new mongoose.Schema({
    _id: {type: Number},
    url: String,
    hash: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const URLmap = mongoose.model('URLmap', urlmapSchema);
module.exports = URLmap;