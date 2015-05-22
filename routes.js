
var Index = require("./app/controllers/index");

module.exports = function (app) {

    app.get("/", Index.index);

};
