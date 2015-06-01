var Index = require("./app/controllers/index");
var Save = require("./app/controllers/save");
var Admin = require("./app/controllers/admin");

module.exports = function (app) {

    app.get("/goodhabit", Index.index);

    app.post("/goodhabit/admin/save", Save.save);

    app.get("/goodhabit/admin", Admin.admin);
    
};
