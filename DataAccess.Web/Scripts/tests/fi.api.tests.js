
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
        $(document).bind('statesReceived', function (apiMethod) {          
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getStates();
        setTimeout(function () {        
            equal(fi.api.states[0].code, "USAK", "USAK Expected");
            start();
        }, 3500);
    });
    test("Get Cities for State", function () {
        var selectedStateCode = 'USFL';
        var myData = null;
        $(document).bind('citiesReceived', function (apiMethod) {                       
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getCities('USFL');
        setTimeout(function () {
            equal(fi.api.cities[0].name, 'Gainesville');
            start();
        }, 3500);
    });
