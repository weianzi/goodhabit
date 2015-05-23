var Index = require("./app/controllers/index");
var Save = require("./app/controllers/save");

module.exports = function (app) {

    app.get("/", Index.index);

    app.post("/admin/save", Save.save)

};
