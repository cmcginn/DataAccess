
function City(id, code, name, selected, cb) {

    this.id = ko.observable(id);
    this.code = ko.observable(code);
    this.name = ko.observable(name);
    this.selected = ko.observable(selected);
}
function Phrase(phrase, score, selected) {
    this.phrase = ko.observable(phrase);
    this.score = ko.observable(score);
    this.selected = ko.observable(selected);
}
var index = {
    /*---------------------State-----------------------*/

    userSessionId: 'UserSessions/321',
    userId: 'users/193',
    /*---------------------Data Access-----------------------*/
    getStates: function (cb) {
        $.getJSON(apiHost + '/StateProvinces?callback=?', null, function (data, textStatus, jqXHR) {
            index.dataModel.states = data;
            cb();
        });
    },
    getCities: function (state, cb) {
        $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + state.code() + '\')&callback=?', null, function (data, textStatus, jqXHR) {
            $(data).each(function () {
                var city = new City(this.id, this.code, this.name, this.selected);
                city.selected.subscribe(function (newVal) {
                    index.citySelected(city);
                });
                state.cities().push(city);
            });
            cb();
        });
    },
    createProfileQuery: function (cb) {
        $.ajax({
            type: 'GET',
            url: '/api/ProfileQueries',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                index.dataModel.profileQuery = data;
                cb();
            }
        })
    },
    saveProfileQuery: function () {
        $.ajax({
            type: 'POST',
            url: apiHost + '/UserProfileQueries',
            data: index.viewModel.profileQuery,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            }
        });
    },
    /*---------------------Events-----------------------*/
    onDataReceived: function () {
        if (index.dataModel.states.length > 0) {
            index.mapViewModel();
            ko.applyBindings(index.viewModel);
            index.layout();
        }
    },
    /*---------------------Models-----------------------*/
    dataModel: {
        states: [],
        profileQuery: {
            userId: null,
            name: null,
            locations: [],
            phrases: ko.observable([])
        },
        newPhrase: {
            phrase: null,
            score: null,
            selected: false
        }

    },
    stateSelected: function (item) {
        index.getCities(item, function () {
            var node = $('.content[data-code="' + item.code() + '"]');
            ko.applyBindingsToNode(node[0], { template: { name: 'cities-template', data: item } });
            node.height('100%');
        });
    },
    addPhrase: function (item) {
        var phrases = index.viewModel.profileQuery.phrases();
        phrases.push(new Phrase(item.phrase(), item.score(), true));
        index.viewModel.profileQuery.phrases(phrases);
    },
    removePhrase: function (item) {
        item.selected(false);
    },
    citySelected: function (city) {

        var viewModelItem = ko.utils.arrayFilter(index.viewModel.profileQuery.locations(), function (item) {
            return item.id() == city.id();
        });
        if (viewModelItem.length == 0)
            index.viewModel.profileQuery.locations().push(city);
        else
            viewModelItem[0].selected(city.selected());
    },
    mapping: {
        'states': {
            'create': function (options) {

                var item = {
                    name: ko.observable(options.data.name),
                    code: ko.observable(options.data.code),
                    cities: ko.observable([]),
                    selected: function (e) {
                        index.stateSelected(e);
                    }
                };
                return item;

            }
        }
    },
    viewModel: null,
    mapViewModel: function () {
        index.dataModel.profileQuery.userId = index.userId;
        index.viewModel = ko.mapping.fromJS(index.dataModel, index.mapping);
        //ko.postbox.subscribe('name', function (newValue) {
        //    console.log('newValue');
        //    var cities = [];
        //    cities.push(new City('/US/FL/Orlando', 'Orlando'));
        //    cities.push(new City('/US/FL/Tampa', 'Tampa'));
        //    cities.push(new City('/US/FL/Miami', 'Miami'));


        //}, index.viewModel);
    },

    layout: function () {
        $('.state').accordion({
            active: false,
            collapsible: true,
            beforeActivate: function (event) {
                index.stateSelected(this);
            }
        });
        $('#profile_query_name').watermark('Query Name (Required)');
        $('#btn_add_phrase').button({
            icons: {
                primary: 'ui-icon-plus'
            },
            text: false
        }).click(function () {

            $('.phrase-remove:last').button({
                icons: {
                    primary: 'ui-icon-minus'
                },
                text: false
            });

        });

    },
    init: function () {

        index.getStates(function () {
            index.onDataReceived();
        });
        //index.createProfileQuery(function () {
        //    index.onDataReceived();
        //});

    }

}

$(function () {
    index.init();
});