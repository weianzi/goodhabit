var Index = require("./app/controllers/index");
var Save = require("./app/controllers/save");
var Admin = require("./app/controllers/admin");

module.exports = function (app) {

    app.get("/", Index.index);

    app.post("/admin/save", Save.save)

    app.get("/admin", Admin.admin);
    
};
