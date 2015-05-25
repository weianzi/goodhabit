var Habit = require("../models/habit");

exports.admin = function (req, res) {

    Habit.fetch(function (err, habits) {
        if (err) {
            console.log(err);
        }


        for (var item in habits) {
            var aItemScore = JSON.parse(habits[item].aItemScore);
            //console.log("----");
            //console.log(aItemScore);
        }



        res.render("admin", {
            title: "查看用户提交测试信息",
            habits: habits
        });
    });

};