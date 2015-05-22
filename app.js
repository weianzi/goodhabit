/**
 * Created by ancool on 2015-05-22.
 */

var express = require("express");
var port = process.env.PORT || 3000;
var path = require("path");
var app = express();

require("./routes")(app);

app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
app.listen(port);

console.log("服务启动成功在端口" + port);