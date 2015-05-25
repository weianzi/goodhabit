var mongoose = require("mongoose");
var HabitSchema = new mongoose.Schema({
    sumScore: Number,
    aItemScore: Object,
    oCategoryScore: Object,
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
            .sort("createAt")
            .exec(cb);
    },
    findById: function (id, cb) {
        return this.findOne({_id: id})
            .exec(cb);
    }
};

module.exports = HabitSchema;