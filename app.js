/**
 * Created by ancool on 2015-05-22.
 */

var express = require("express");
var port = process.env.PORT || 3000;
var path = require("path");
var mongoose = require("mongoose");
var Habit = require("./app/models/habit");
var app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/habit");

app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
app.listen(port);

require("./routes")(app);

console.log("服务启动成功在端口" + port);