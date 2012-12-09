var timeout = 3000;
module("FI Viewmodels");

test("States View Model", function () {
    $(document).bind('statesViewmodelCreated', function (apiMethod) {
        $(document).unbind(apiMethod);
    });
    stop();
    fi.viewmodels.getStatesVm();
    setTimeout(function () {
        start();
        ok(fi.viewmodels.statesVm);
    }, timeout);
});
   
test("State Selected", function () {
    var cityCount = 0;
    $(document).bind('statesViewmodelCreated', function (event) {
        $(document).unbind(event);
    });
    $(document).bind('citiesViewmodelCreated', function (event) {
        cityCount = fi.viewmodels.statesVm()[0].cities().length;
        $(document).unbind(event);
    });
    stop();
    fi.viewmodels.getStatesVm();
    setTimeout(function () {               
        stop();
        fi.viewmodels.statesVm()[0].selected(true);
        setTimeout(function () {
            ok(cityCount > 0);
            start();
        }, timeout);
        start();
    }, timeout);
});
