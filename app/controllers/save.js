var Habit = require("../models/habit");

exports.save = function (req, res) {

    var _habit;

    _habit = new Habit({
        sumScore: req.body.sumScore
    });

    _habit.save(function (err, habit) {
        if (err) {
            console.log(err);
        }
        else {
            res.json({success: 1})
            console.log("接收到数据");
            console.log(req.body.sumScore);
        }
    })


    //console.log(req.params.aItemScore);
    //console.log(req.body.oCategoryScore[主动积极]);
    //console.log(req.params.oCategoryScore[主动积极]);

};