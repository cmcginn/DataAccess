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
        },
        locations: function (code) {
            $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + code + '\')&callback=?', null, function (data, textStatus, jqXHR) {
                get.onDataReceived('locations', data, textStatus, jqXHR);
            });
        },
        cities: function (code) {
            $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + code + '\') and length(Code) gt 4&callback=?', null, function (data, textStatus, jqXHR) {
                get.onDataReceived('cities', data, textStatus, jqXHR);
            });
        }
    }

    fi.api = function () {
        //state model
        states = [];
        state = function (data) {
            return {
                id: data.id,
                code: data.code,
                name: data.name,
                selected: false
            }
        };
        //city model
        cities = [];
        city = function (data) {
            return {
                id: data.id,
                code: data.code,
                name: data.name,
                selected: false
            }
        };
        $(document).bind('dataReceived', function (apiMethod) {

            switch (apiMethod.message.apiMethod) {
                case 'states':

                    $(apiMethod.message.data).each(function () {
                        states.push(new state($(this)[0]));
                    });
                    $.event.trigger({
                        type: 'statesReceived',
                        message: { textStatus: apiMethod.message.textStatus }
                    });
                    break;
                case 'cities':
                    $(apiMethod.message.data).each(function () {
                        cities.push(new city($(this)[0]));
                    });
                    $.event.trigger({
                        type: 'citiesReceived',
                        message: { textStatus: apiMethod.message.textStatus }
                    });
                    break;
                default:
                    break;
            }


        });
        return {

            getNewProfileQuery: function () { get.profileQuery(null) },
            getStates: get.states,
            getCities: get.cities,
            states: states,
            cities:cities
        }
    }()
});

