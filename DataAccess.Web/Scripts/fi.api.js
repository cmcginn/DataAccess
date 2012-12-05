$(function () {

    var get = {
        onDataReceived: function (apiMethod, data, textStatus, jqXHR) {
            $.event.trigger({
                type: 'dataReceived',
                message: { apiMethod: apiMethod, data: data, textStatus: textStatus, jqXHR: jqXHR },
                time: new Date()
            });
        },
        profileQuery: function (id) {
            $.getJSON(apiHost + '/UserProfileQueries?id=' + id + '&callback=?', null, function (data, textStatus, jqXHR) {
                get.onDataReceived('profileQuery', data, textStatus, jqXHR);              
            });
        },
        states: function () {
            $.getJSON(apiHost + '/StateProvinces?callback=?', null, function (data, textStatus, jqXHR) {
                get.onDataReceived('states', data, textStatus, jqXHR);
            });
        }
    }

    fi.api = function () {
        return {
            getNewProfileQuery: function () { get.profileQuery(null) },
            getStates:get.states
        }
    }()
});

