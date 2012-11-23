function State(id, name) {
    self = this;
    self.id = id;
    self.name = name;
}
function City(id, name) {
    self = this;
    self.id = id;
    self.name = name;
}
var index = {
    /*---------------------Data Access-----------------------*/
    getStates:function(cb){
        $.ajax({
            type: 'GET',
            url: '/api/common/QueryLocations',
            dataType: 'json',
            data:{query:'Code:US/??'},
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
            data: { query: 'Code:'+state.id()+'/*'},
            success: function (data, textStatus, jqXHR) {
                var cities = [];
                $(data).each(function () {
                    cities.push(new City(this.Code,this.Name));
                });
                
                state.cities(cities);
                cb();
            }
        })
    },
    /*---------------------Models-----------------------*/
            dataModel:{
            States: []
            },
        stateSelected:function(item){           
            index.getCities(item, function () {
                var node = $('.content[data-id="' + item.id() + '"]');
                ko.applyBindingsToNode(node[0], { template: { name: 'cities-template', data: item } });
                node.height('100%');
            });
        },
        mapping: {
            'States': {
                'create': function (options) {
                
                    var item = {
                        name: ko.observable(options.data.Name),
                        id: ko.observable(options.data.Code),
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
        mapViewModel:function()
        {
            index.viewModel = ko.mapping.fromJS(index.dataModel, index.mapping);
            //ko.postbox.subscribe('name', function (newValue) {
            //    console.log('newValue');
            //    var cities = [];
            //    cities.push(new City('/US/FL/Orlando', 'Orlando'));
            //    cities.push(new City('/US/FL/Tampa', 'Tampa'));
            //    cities.push(new City('/US/FL/Miami', 'Miami'));


            //}, index.viewModel);
        },
        init: function () {

            index.getStates(function () {
                index.mapViewModel();
                ko.applyBindings(index.viewModel);
                index.layout();
            });

       
        },   
        layout: function () {
            $('.state').accordion({
                active: false,                
                collapsible: true,                
                beforeActivate: function (event) {
                    index.stateSelected(this);                    
                }
            });
        }

    }

$(function () {
    index.init();
});