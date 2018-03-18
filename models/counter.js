const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

counterSchema.statics.getNextSequence = function(sequencename){
    let sequenceDocument = Counter.findByIdAndUpdate(
        sequencename, {$inc:{count:1}},{ new: true },
        function(error, counter){
            if(error){
                return error;
            } else {
                if(Object.keys(counter).length === 0){
                    let myCounter = new Counter({_id: "counter", count: "1"});
                    myCounter.save(function(err, docs){
                        if(err){
                            return err;
                        } else {
                            return docs.count;
                        }
                    });
                }
                return sequenceDocument.count;
            }
        }
    );
};

module.exports = Counter;