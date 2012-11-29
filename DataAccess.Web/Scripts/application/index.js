function State(id, name) {
    self = this;
    self.id = id;
    self.name = name;

}
function City(id, name, selected, cb) {
    
    this.id = id;
    this.name = name;
    this.selected = ko.observable(selected);
    
    }
var index = {
    /*---------------------State-----------------------*/

    userSessionId: 'UserSessions/321',
    userId:'users/193',
    /*---------------------Data Access-----------------------*/
    getStates: function (cb) {
        $.ajax({
            type: 'GET',
            url: '/api/common/Locations?$filter=',
            dataType: 'json',
            data: { query: 'Code:US/??' },
            success: function (data, textStatus, jqXHR) {
                index.dataModel.States = data;
                cb();
            }
        });
    },
    getCities: function (state, cb) {
        $.ajax({
            type: 'GET',
            url: '/api/common/QueryLocations',
            dataType: 'json',
            data: { query: 'Code:' + state.id() + '/*' },
            success: function (data, textStatus, jqXHR) {

                $(data).each(function () {
                    var city = new City(this.Id, this.Name, this.Selected);
                    city.selected.subscribe(function (newVal) {
                        index.citySelected(city);
                    });
                    state.cities().push(city);
                });
                cb();
            }
        })
    },
    createProfileQuery:function(cb){
        $.ajax({
            type: 'GET',
            url: '/api/ProfileQueries',
            dataType: 'json',            
            success: function (data, textStatus, jqXHR) {
                index.dataModel.ProfileQuery = data;
                cb();
            }
        })
    },
    /*---------------------Events-----------------------*/
    onDataReceived:function(){
        if (index.dataModel.States.length > 0
            && index.dataModel.ProfileQuery != null) {
            index.mapViewModel();
            ko.applyBindings(index.viewModel);
            index.layout();
        }
    },
    /*---------------------Models-----------------------*/
    dataModel: {
        States: [],
        ProfileQuery: null,

    },
    stateSelected: function (item) {
        index.getCities(item, function () {
            var node = $('.content[data-id="' + item.id() + '"]');
            ko.applyBindingsToNode(node[0], { template: { name: 'cities-template', data: item } });
            node.height('100%');
        });
    },
    citySelected: function (item) {
        
        $.ajax({
            type: 'POST',
            url: '/api/common/SaveLocation',
            dataType: 'json',
            data: item
        });
    },
    mapping: {
        'States': {
            'create': function (options) {

                var item = {
                    name: ko.observable(options.data.Name),
                    id: ko.observable(options.data.Id),
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