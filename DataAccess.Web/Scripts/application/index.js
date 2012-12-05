
function City(id, code, name, selected, cb) {

    this.id = ko.observable(id);
    this.code = ko.observable(code);
    this.name = ko.observable(name);
    this.selected = ko.observable(selected);
}
function Phrase(value, score, selected) {
    this.value = ko.observable(value);
    this.score = ko.observable(score);
    this.selected = ko.observable(selected);
}
var index = {
    /*---------------------State-----------------------*/

    userSessionId: 'UserSessions/321',
    profileQueryId: '',
    /*---------------------Data Access-----------------------*/

    getCities: function (state, cb) {
        $.getJSON(apiHost + '/Locations?$filter=startswith(Code,\'' + state.code() + '\')&callback=?', null, function (data, textStatus, jqXHR) {
            $(data).each(function () {
                this.selected = index.viewModel.profileQuery.locations.mappedIndexOf({ code: this.code }) > -1;
                var city = ko.mapping.fromJS(this, index.cityMapping)
                state.cities().push(city);
                city.selected.subscribe(function (newVal) {
                    index.citySelected(city);
                });
            });
            cb();
        });
    },

    postProfileQuery: function () {
        $.ajax({
            type: 'POST',
            url: apiHost + '/UserProfileQueries',
            data: ko.mapping.toJS(index.viewModel.profileQuery),
            success: function (data, textStatus, jqXHR) {
                index.viewModel.profileQuery.id = JSON.parse(data).id;
                index.dataModel.profileQuery = data;
                ko.mapping.fromJS(index.dataModel.profileQuery.locations, index.locationsMapping);
                //ko.mapping.fromJS(data.locations,i);
            }
        });
    },

    /*---------------------Events-----------------------*/
    onDataReceived: function (arg) {
        
        $.event.trigger({
            type: 'dataReceived',
            message: arg,
            time: new Date()
        });
    },
    stateSelected: function (item) {
        index.getCities(item, function () {
            var node = $('.content[data-code="' + item.code() + '"]');
            ko.applyBindingsToNode(node[0], { template: { name: 'cities-template', data: item } });
            node.height('100%');
        });
    },
    citySelected: function (city) {
        index.viewModel.profileQuery.locations.mappedRemove({ code: city.code() });
        if (city.selected())
            index.viewModel.profileQuery.locations().push(city);

    },
    /*---------------------Models-----------------------*/
    viewModel: null,
    dataModel: {
        states: [],
        profileQueries: [],
        profileQuery: null,
        newPhrase: {
            value: null,
            score: null,
            selected: false
        }

    },
    profileQueriesMapping: {
        'profileQueries': {
            'create': function (options) {
                return options.data;
            }
        }
    },
    statesMapping: {
        'states': {
            key: function (data) {
                return ko.utils.unwrapObservable(data.code);
            },
            'create': function (options) {

                var item = {
                    name: options.data.name,
                    code: options.data.code,
                    cities: [],
                    selected: function (e) {
                        //index.stateSelected(e);
                    }
                };
                return ko.mapping.fromJS(item);
            }
        }
        
    },
    locationsMapping: {

        key: function (data) {
            return ko.utils.unwrapObservable(data.code);
        }

    },
    phrasesMapping: {
        'phrases': {
            'create': function (options) {
                options.data.selected = true;
                return options.data;
            }
        }
    },
    profileQueryMapping: {
        'profileQuery': {
            'create': function (options) {
                return options.data;
            }
        }
    },
    cityMapping: {
        'create': function (options) {
            return ko.mapping.fromJS(options.data);
        }
    },
    mapping: {
        'profileQuery': {
            'create': function (options) {
                return ko.mapping.fromJS(options.data, {

                });
            },
            'update': function (options) {
                return ko.mapping.fromJS(options.data, {
                    'locations': {
                        key: function (data) {
                            return ko.utils.unwrapObservable(data.code);
                        }
                    },
                    'phrases': {
                        'create': function (options) {
                            options.data.selected = ko.observable(true);
                            return options.data;
                        }
                    }
                });
            }
        },

        'states': {
            key: function (data) {
                return ko.utils.unwrapObservable(data.code);
            },
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

    mapViewModel: function () {
        //index.dataModel.profileQuery.userId = index.userId;
        //index.viewModel = ko.mapping.fromJS(index.dataModel, index.mapping);
        index.viewModel = ko.mapping.fromJS(index.dataModel, index.mapping);
        ko.applyBindings(index.viewModel);

    },
    /*---------------------Helpers-----------------------*/
    addPhrase: function (item) {
        var phrases = index.viewModel.profileQuery().phrases();
        phrases.push(new Phrase(item.value(), item.score(), true));
        index.viewModel.profileQuery().phrases(phrases);
        index.viewModel.newPhrase.value('');

    },
    loadProfileQueries: function () {
        api.get.profileQueries();
    },
    loadProfileQuery: function (id) {
        api.get.profileQuery(id);
    },
    loadStates:function(){
        api.get.states();
    },
    removePhrase: function (item) {
        item.selected(false);
        var selectedPhrases = ko.utils.arrayFilter(index.viewModel.profileQuery.phrases(), function (item) {
            return item.selected();
        });
        index.viewModel.profileQuery.phrases(selectedPhrases);
    },


    /*---------------------Initialization-----------------------*/
    initializeStates: function (data) {
        index.dataModel.states = data;
        ko.mapping.fromJS(index.dataModel, index.statesMapping, index.viewModel);
        ko.applyBindingsToNode(document.getElementById("states"), { template: { name: 'states-template' } }, index.viewModel.states);
        $.event.trigger({
            type: 'viewModelUpdated',
            message: { root: 'states' },
            time: new Date()
        });
    },
    initializeProfileQueries:function(data){
        index.dataModel.profileQueries = data;
        ko.mapping.fromJS(index.dataModel, index.profileQueriesMapping, index.viewModel);
        ko.applyBindingsToNode(document.getElementById("profileQueries"), { template: { name: 'profileQueries-template' } }, index.viewModel.profileQueries);
        $.event.trigger({
            type: 'viewModelUpdated',
            message: { root: 'profileQueries' },
            time: new Date()
        });
    },
    initializeProfileQuery:function(data){
        index.dataModel.profileQuery = data;
        ko.mapping.fromJS(index.dataModel, index.profileQueryMapping, index.viewModel);
        ko.mapping.fromJS(index.dataModel, index.phrasesMapping, index.viewModel);
        ko.applyBindingsToNode(document.getElementById("profileQuery"), { template: { name: 'profileQuery-template' } }, index.viewModel.profileQuery);
        ko.applyBindingsToNode(document.getElementById("newPhrase"), { template: { name: 'newPhrase-template' } }, index.viewModel.newPhrase);
        ko.applyBindingsToNode(document.getElementById("phrases"), { template: { name: 'phrases-template' } }, index.viewModel.profileQuery().phrases)
        $.event.trigger({
            type: 'viewModelUpdated',
            message: { root: 'profileQuery'},
            time: new Date()
        });

    },

    init: function () {
        index.viewModel = ko.mapping.fromJS(index.dataModel);
        $(document).bind('dataReceived', function (e) {
            switch (e.message.apiMethod) {
                case 'states':
                    index.initializeStates(e.message.data);
                    break;
                case 'profileQueries':
                    index.initializeProfileQueries(e.message.data);
                    break;
                case 'profileQuery':
                    index.initializeProfileQuery(e.message.data);
                    break;
                default: break;
            }
        });

        
    }

}

$(function () {
    index.init();
});