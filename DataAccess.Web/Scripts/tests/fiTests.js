
    module("FI API");
    test("Creation", function () {
        ok(fi.api, "api exists");
    });
    test("Get New Query Profile", function () {
        var myData = null;
        $(document).bind('dataReceived', function (apiMethod) {
            myData = apiMethod.message;
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getNewProfileQuery();
        setTimeout(function () {
            ok(myData != null, "Date returned");
            start();
        }, 3500);
    });
    test("Get States", function () {
        var myData = null;
        $(document).bind('dataReceived', function (apiMethod) {
            myData = apiMethod.message;
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getStates();
        setTimeout(function () {
            ok(myData != null, "States Returned");
            start();
        }, 3500);
    });
