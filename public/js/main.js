$(function () {    var test = new GoodHabitTest($(".question"), $("#conclusion"));    test.initial();});function GoodHabitTest(item, result) {    this.item = item; //各试题    this.conclusion = result;//结果显示div    this.aItemScore = [];//各题得分数    this.oCategoryScore = {};//排序后的各分类对应总分    this.sum = 0; //总得分}GoodHabitTest.prototype = {    //修正构造器指向    constructor: GoodHabitTest,    //初始化    initial: function () {        var _this = this;        var loadingPage = $(".loading-page");        var wrapper = $(".wrapper");        var start = $("#start");        var startBtn = $("#start .mybtn");        var end = $("#end");        var enterBtn = $("#conclusion .enter");        var shareBtn = $("#end .share");        var timer = null;        var mcover = $("#mcover");        var hash = window.location.hash.substring(1) || "";        clearTimeout(timer);        loadingPage.fadeIn();        timer = setTimeout(function () {            loadingPage.fadeOut();            start.css("visibility", "visible");        }, 300);        //屏幕自动匹配        fontSize();        function fontSize() {            var winWidth = $(window).width();            if (winWidth > 640) winWidth = 640;            $("html").css("font-size", winWidth / 16 + 'px');        }        //点击答案后，下一题出现        this.nextQuestionShow();        startBtn.on("click", function () {            start.hide();            wrapper.show();        });        enterBtn.on("click", function () {            window.location.hash = "end";        });        shareBtn.on("click", function () {            mcover.show();        });        mcover.on("click", function () {            $(this).hide();        });        if (hash == "conclusion") {            start.hide();            wrapper.hide();            this.item.hide();            this.conclusion.show().html(window.localStorage.getItem("conclusionHtml"));        } else if (hash == "end") {            start.hide();            wrapper.hide();            this.conclusion.hide();            end.show();        }        window.onhashchange = function () {            window.location.reload();        };    },    //点击后，下一题出现    nextQuestionShow: function () {        var _this = this;        var iNum = 0;        var iBtn = true;        var wrapper = $(".wrapper");        var clickSound = $("#clickSound")[0];        var num = $(".wrapper .num span");        var numNow = $(".wrapper .num-now span");        var left = 0;        this.item.hide().eq(0).show();        this.item.find("input").click(function () {            var $that = $(this);            var numWidth = num.width() + parseInt(num.css("margin-right"));            clickSound.play();            if (iBtn) {                iBtn = false;                var questionItem = $(this).parents(".question");                iNum++;                _this.aItemScore.push([                    questionItem.data("goodhabit"),                    questionItem.data("category"),                    parseInt($that.data("score"))                ]);                var timer = null;                clearTimeout(timer);                timer = setTimeout(function () {                    if (iNum > 5) {                        left -= numWidth;                    }                    questionItem.hide().next(".question").show();                    num.removeClass("active").eq(iNum).addClass("active");                    num.parent().animate({"left": left}, 100);                    numNow.text(iNum + 1);                    iBtn = true;                }, 100);                if (iNum > _this.item.length - 1) {                    iNum = 0;                    wrapper.hide();                    _this.totalScore();                }            }        });    },    //计算分数    totalScore: function () {        var json = {};//各分类对应总分        var sum01 = 0, sum02 = 0, sum03 = 0, sum04 = 0, sum05 = 0, sum06 = 0, sum07 = 0;        for (var i in this.aItemScore) {            //总分            this.sum += this.aItemScore[i][2];            //主动积极            if (this.aItemScore[i][1] == "01") {                sum01 += this.aItemScore[i][2];                json["主动积极"] = sum01;                //以终为始            } else if (this.aItemScore[i][1] == "02") {                sum02 += this.aItemScore[i][2];                json["以终为始"] = sum02;                //要事第一            } else if (this.aItemScore[i][1] == "03") {                sum03 += this.aItemScore[i][2];                json["要事第一"] = sum03;                //知彼解己            } else if (this.aItemScore[i][1] == "04") {                sum04 += this.aItemScore[i][2];                json["知彼解己"] = sum04;                //双赢思维            } else if (this.aItemScore[i][1] == "05") {                sum05 += this.aItemScore[i][2];                json["双赢思维"] = sum05;                //统合综效            } else if (this.aItemScore[i][1] == "06") {                sum06 += this.aItemScore[i][2];                json["统合综效"] = sum06;                //不断更新            } else if (this.aItemScore[i][1] == "07") {                sum07 += this.aItemScore[i][2];                json["不断更新"] = sum07;            }        }        for (var item in lightFlash) {            //console.log(item);            this.oCategoryScore[item] = json[item];        }        //将数据渲染到页面        this.render();        //将数据存储到后台        this.saveData();    },    //页面内容更新    render: function () {        var wrapper = $(".wrapper");        var start = $("#start");        var totalScore = $(".total-score");        var epilogue = $(".epilogue");        var summaryStart = $(".summary-start");        var summaryEnd = $(".summary-end");        var lightFlashDiv = $(".light-flash");        var goodDiv = $(".light-flash > .good");        var badDiv = $(".light-flash > .bad");        var summaryNarrow = $(".summary-narrow");        var arr02 = [];//发光点（0-2分）        var arr34 = [];//发光点（3-4分）        var arr56 = [];//发光点（5-6分）        //总分        totalScore.find("span").eq(0).text((this.sum + 58) + "分").end()            .eq(1).text(parseInt(this.sum * 100 / 42) + "%");        //总评语        epilogue.text(summary[0].epilogue);        //导语、结语        if (this.sum < 15) {            totalScore.find("i").attr("class", "");            summaryStart.show().text(summary[1]["start"]);            summaryEnd.show().text(summary[1]["end"]);        } else if (15 <= this.sum < 35) {            totalScore.find("i").attr("class", "text02");            summaryStart.show().text(summary[2]["start"]);            summaryEnd.show().text(summary[2]["end"]);        } else if (35 <= this.sum < 42) {            totalScore.find("i").attr("class", "text03");            summaryStart.show().text(summary[3]["start"]);            summaryEnd.show().text(summary[3]["end"]);        }        //发光点与警惕        for (var item in this.oCategoryScore) {            if (this.oCategoryScore[item] > 4) { //发光点（5-6分）                arr56.push(item);            } else if (this.oCategoryScore[item] < 3) {//发光点（0-2分）                arr02.push(item);            } else { //发光点（3-4分）                arr34.push(item);            }        }        if (arr56.length > 0) {            lightFlashDiv.show();            goodDiv.show();            for (var i in arr56) {                goodDiv.append("<p>▪ " + lightFlash[arr56[i]]["good"] + "</p>");            }        }        if (arr02.length > 0) {            lightFlashDiv.show();            badDiv.show();            for (var i in arr02) {                badDiv.append("<p>▪ " + lightFlash[arr02[i]]["bad"] + "</p>");            }        }        //各分类的总分是3-4分的或其他分的，显示以下内容        if (arr56.length == 0 && arr02.length == 0) {            summaryStart.hide();            summaryEnd.hide();            summaryNarrow.show().text(summary[4]["narrow"]);        }        //window.location.hash = "conclusion";        start.hide();        wrapper.hide();        this.item.hide();        this.conclusion.show();    },    //将数据存储    saveData: function () {        var newObj = {};        for (var item in this.aItemScore) {            var index = parseInt(item) + 1;            newObj["第" + index + "题"] = this.aItemScore[item][2];        }        //console.log(newObj);        $.ajax({            type: "post",            url: "/admin/save",            data: {                "sumScore": this.sum,                "aItemScore": JSON.stringify(newObj),                "oCategoryScore": JSON.stringify(this.oCategoryScore)            },            success: function (results) {                //console.log(results.success)                if (results.success == 1) {                    console.log("提交成功")                }            }        });        //存储到本地        window.localStorage.setItem("conclusionHtml", this.conclusion.html());    }};