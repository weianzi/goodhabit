var mongoose = require("mongoose");
var HabitSchema = new mongoose.Schema({
    sumScore: Numbers,
    aItemScore: Array,
    oCategoryScore: Object,
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports =HabitSchema;