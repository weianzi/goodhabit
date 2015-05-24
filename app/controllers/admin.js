var Habit = require("../models/habit");

exports.admin = function(req,res){

	Habit.fetch(function(err, habits){
		if(err){
			console.log(err);
		}

		res.render("admin",{
			title: "查看用户提交测试信息",
			habits: habits
		});
	});

};