var Habit = require("../models/habit");
var moment = require("moment");

exports.save = function (req, res) {

    var _habit;
    _habit = new Habit({
        sumScore: req.body.sumScore,
        aItemScore: req.body.aItemScore,
        oCategoryScore: req.body.oCategoryScore
    });

    _habit.save(function (err, habit) {
        if (err) {
            console.log(err);
        } else {
            console.log("Data is successfully saved to the mongoDB -- " + moment(habit.createAt).format('YYYY-MM-DD HH:mm:ss'));
            res.json({
                success: 1
            });
        }
    })

};