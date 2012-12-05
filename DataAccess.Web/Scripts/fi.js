$(function () {
    var privateVal = 3;
    fi.getTotal = function () {
        return privateVal + 4;
    };
});

var fi = fi || {}; //my namespace
