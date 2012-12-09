$(function () {
    var onDataReceived = function (apiMethod, data, textStatus, jqXHR) {
        $.event.trigger({
            type: 'dataReceived',
            message: { apiMethod: apiMethod, data: data, textStatus: textStatus, jqXHR: jqXHR },
            time: new Date()
        });
    }
    var onDataPosted = function (apiMethod, data, textStatus, jqXHR) {
        $.event.trigger({
            type: 'dataPosted',
            message: { apiMethod: apiMethod, data: data, textStatus: textStatus, jqXHR: jqXHR },
            time: new Date()
        });
    }
    var get = {
       
        profileQuery: function (id) {
            $.getJSON(apiHost + '/UserProfileQueries?id=' + id + '&callback=?', null, function (data, textStatus, jqXHR) {
                onDataReceived('profileQuery', data, textStatus, jqXHR);
            });
        },
        states: function () {
            $.getJSON(apiHost + '/StateProvinces?callback=?', null, function (data, textStatus, jqXHR) {
                onDataReceived('states', data, textStatus, jqXHR);
            });
        },
        locations: function (code) {
            $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + code + '\')&callback=?', null, function (data, textStatus, jqXHR) {
                onDataReceived('locations', data, textStatus, jqXHR);
            });
        },
        cities: function (code) {
            $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + code + '\') and length(Code) gt 4&callback=?', null, function (data, textStatus, jqXHR) {
                onDataReceived('cities', data, textStatus, jqXHR);
            });
        }

    
    }
    var post = {
        profileQuery: function (item) {
            $.ajax({
                type: 'POST',
                url: apiHost + '/UserProfileQueries',
                data: item,
                dataType:'json',
                success: function (data, textStatus, jqXHR) {
                    onDataPosted('profileQuery', data, textStatus, jqXHR);
                }
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
                cities:[],
                selected: false
            }
        };
        function profileQueryModel(data) {
            fi.api.profileQuery.id = data.id;
            fi.api.profileQuery.name = data.name;
            fi.api.profileQuery.userId = data.userId;
            fi.api.profileQuery.locations = data.locations;
        }
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
        profileQuery = {};
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
                case 'profileQuery':
                    profileQuery = new profileQueryModel(apiMethod.message.data);
                    $.event.trigger({
                        type: 'profileQueryReceived',
                        message: { textStatus: apiMethod.message.textStatus }
                    });
                    break;
                default:
                    break;
            }


        });
        $(document).bind('dataPosted', function (event) {
            switch (event.message.apiMethod) {
                case 'profileQuery':
                    profileQuery = profileQueryModel(event.message.data);
                    $.event.trigger({
                        type: 'profileQueryPosted',
                        message: { textStatus: event.message.textStatus },
                        time: new Date()
                    });
                    break;
                default:
                    break;
            }
        });
        return {

            getNewProfileQuery: function () { get.profileQuery(null) },
            saveProfileQuery: function () { post.profileQuery(fi.api.profileQuery) },
            getStates: get.states,
            getCities: get.cities,
            states: states,
            cities: cities,
            profileQuery:profileQuery
        }
    }()
});

