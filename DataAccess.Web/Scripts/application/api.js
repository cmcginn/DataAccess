var api = {
    get: {
        onDataReceived: function (apiMethod, data, textStatus, jqXHR) {
            $.event.trigger({
                type: 'dataReceived',
                message: { apiMethod: apiMethod, data: data, textStatus: textStatus, jqXHR: jqXHR },
                time: new Date()
            });
        },
        profileQueries: function () {
            $.getJSON(apiHost + '/UserProfileQueries?callback=?', null, function (data, textStatus, jqXHR) {
                api.get.onDataReceived('profileQueries', data, textStatus, jqXHR);
            });
        },
        profileQuery: function (id) {
            $.getJSON(apiHost + '/UserProfileQueries?id=' + id + '&callback=?', null, function (data, textStatus, jqXHR) {
                api.get.onDataReceived('profileQuery', data, textStatus, jqXHR);
            });
        },
        states: function () {
            $.getJSON(apiHost + '/StateProvinces?callback=?', null, function (data, textStatus, jqXHR) {
                api.get.onDataReceived('states', data, textStatus, jqXHR);
            });
        }
    }
}