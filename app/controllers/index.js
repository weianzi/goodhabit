exports.index = function (req, res) {
    res.render("index", { //渲染index.jade
        title: "生活好习惯，我测你来看"
    });
}; 