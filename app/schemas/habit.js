var mongoose = require("mongoose");

var HabitSchema = new mongoose.Schema({
    sumScore: Number,
    aItemScore: String,
    oCategoryScore: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
});

HabitSchema.pre("save", function (next) {
    this.createAt = Date.now();
    next();
});

HabitSchema.statics = {
    fetch: function (cb) {
        return this.find({})
            .sort({"createAt": -1})
            .exec(cb);
    },
    findById: function (id, cb) {
        return this.findOne({_id: id})
            .exec(cb);
    }
};

module.exports = HabitSchema;