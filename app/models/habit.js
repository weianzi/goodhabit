var mongoose = require("mongoose");
var HabitSchema = require('../schemas/habit');
var Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;