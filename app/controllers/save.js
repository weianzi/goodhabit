var Habit = require("../models/habit");

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
        }
        else {

            console.log("接收到数据，并成功存储到mongoDB!");

            res.json({
                success: 1
            });
            
            //console.log(habit); //habit：当前存储的信息对象
        }
    })

};