
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
    userId: 'users/193',
    profileQueryId:'ProfileQueries/673',
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
                var city = ko.mapping.fromJS(this, index.cityMapping)
                state.cities().push(city);
                city.selected.subscribe(function (newVal) {
                    index.citySelected(city);
                });
            });
            cb();
        });
    },
    getProfileQuery:function(cb){
        $.getJSON(apiHost + '/UserProfileQueries?id='+index.profileQueryId+'&callback=?', null, function (data, textStatus, jqXHR) {
            index.dataModel.profileQuery = data;           
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
    stateSelected: function (item) {
        index.getCities(item, function () {
            var node = $('.content[data-code="' + item.code() + '"]');
            ko.applyBindingsToNode(node[0], { template: { name: 'cities-template', data: item } });
            node.height('100%');
        });
    },
    citySelected: function (city) {

        var viewModelItem = ko.utils.arrayFilter(index.viewModel.profileQuery.locations(), function (item) {
            return item.id() == city.id();
        });
        if (viewModelItem.length == 0)
            index.viewModel.profileQuery.locations().push(city);
        else
            viewModelItem[0].selected(city.selected);
    },
    /*---------------------Models-----------------------*/
    viewModel: null,
    dataModel: {
        states: [],
        profileQuery:null,
        newPhrase: {
            value: null,
            score: null,
            selected: false
        }

    },
    cityMapping:{
        'create': function (options) {
            options.data.selected = index.viewModel.profileQuery.locations.mappedIndexOf({ code: options.data.code }) > -1;
            return ko.mapping.fromJS(options.data);
        }
    },
    mapping: {
        'profileQuery':{
            'create': function (options) {
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
            'create': function (options) {

                var item = {
                    name: ko.observable(options.data.name),
                    code: ko.observable(options.data.code),
                    key:function(data){
                        return ko.utils.unwrapObservable(data.code);
                    },
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
        index.dataModel.profileQuery.userId = index.userId;
        index.viewModel = ko.mapping.fromJS(index.dataModel, index.mapping);

    },
    /*---------------------Helpers-----------------------*/
    addPhrase: function (item) {
        var phrases = index.viewModel.profileQuery.phrases();
        phrases.push(new Phrase(item.value(), item.score(), true));
        index.viewModel.profileQuery.phrases(phrases);
        index.viewModel.newPhrase.value('');

    },
    removePhrase: function (item) {
        item.selected(false);
        var selectedPhrases = ko.utils.arrayFilter(index.viewModel.profileQuery.phrases(), function (item) {
            return item.selected();
        });
        index.viewModel.profileQuery.phrases(selectedPhrases);
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
        $('#new_phrase').watermark('Search Phrase');
        $('#new_phrase_score').watermark('Score');
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
        $('.phrase-remove').button({
            icons: {
                primary: 'ui-icon-minus'
            },
            text: false
        });
        $('#btn_save').button().click(function () {

            index.postProfileQuery();
        });
    },
    /*---------------------Initialization-----------------------*/
    init: function () {
        index.getProfileQuery(function () {
            index.getStates(function () {
                index.onDataReceived();
            });
        });
    }

}

$(function () {
    index.init();
});