var timeout = 1000;
    module("FI API");
    test("Creation", function () {
        ok(fi.api, "api exists");
    });
/*---------------------------GETS--------------------------*/

   
    test("Get New Query Profile", function () {
     
        $(document).bind('profileQueryReceived', function (apiMethod) {    
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getNewProfileQuery();
        setTimeout(function () {
            ok(fi.api.profileQuery != null, "Date returned");
            start();
        }, timeout);
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
        }, timeout);
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
        }, timeout);
    });
/*---------------------------POSTS--------------------------*/
    test("Post Profile Query", function () {
       
        $(document).bind('profileQueryReceived', function (apiMethod) {
            $(document).unbind(apiMethod);
        });
        stop();
        fi.api.getNewProfileQuery();
        setTimeout(function () {
            ok(fi.api.profileQuery != null, "Date returned");
            start();
            $(document).bind('profileQueryPosted', function (event) {
                $(document).unbind(event);
            });
            stop();
            fi.api.saveProfileQuery();
            setTimeout(function () {
                console.log(fi.api.profileQuery);
                ok(fi.api.profileQuery.id != null,"Profile Query Id is Null");
                start();
            }, 2000);

        }, 2000);

          

    });