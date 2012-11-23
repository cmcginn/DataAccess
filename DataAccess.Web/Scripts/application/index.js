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
    /*---------------------Models-----------------------*/
    dataModel:{
        States: []
    },
    stateSelected:function(item){
        console.log(item.name());
            var cities = [];
            cities.push(new City('/US/FL/Orlando', 'Orlando'));
            cities.push(new City('/US/FL/Tampa', 'Tampa'));
            cities.push(new City('/US/FL/Miami', 'Miami'));
            item.cities(cities);
    },
    mapping: {
        'States': {
            'create': function (options) {
                
                var item = {
                    name: ko.observable(options.data.name).publishOn('name'),
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

        index.dataModel.States.push(new State("US/FL", "Florida"));
        index.dataModel.States.push(new State("US/GA", "Georgia"));
        index.dataModel.States.push(new State("US/AL", "Alabama"));
        index.dataModel.States.push(new State("US/MS", "Mississippi"));
        index.mapViewModel();
        ko.applyBindings(index.viewModel);
        index.layout();
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