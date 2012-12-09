$(function () {

    statesMapping = {
        
            selected: {
                create: function (options) {
                    var result = ko.observable(options.data.selected);
                    result.subscribe(function (newValue) {
                        $.event.trigger({
                            type: 'stateSelected',
                            message: { state: options.parent }
                        });
                    });
                    return result;
                }
            }
        
    }
,
    getNewProfileQueryVm = function () {
        fi.api.getNewProfileQuery();
    }
    getStatesVm = function () {
        fi.api.getStates();
    }
    onStateSelected = function (item) {
        if (!item.selected())
            return;
        $(document).bind('citiesReceived', function (event) {
            item.cities(fi.api.cities);
            $(document).unbind('citiesReceived');
            $.event.trigger({
                type: 'citiesViewmodelCreated',
                message: { textStatus: event.message.textStatus }
            });
        });
        fi.api.getCities(item.code());
    }
    fi.viewmodels = function () {
        profileQueryVm = null;
        statesVm = null;
        $(document).bind('profileQueryReceived', function (event) {

            fi.viewmodels.profileQueryVm = ko.mapping.fromJS(fi.api.profileQuery);
            $.event.trigger({
                type: 'profileQueryViewmodelCreated',
                message: { textStatus: event.message.textStatus }
            });


        });
        $(document).bind('statesReceived', function (event) {
            fi.viewmodels.statesVm = ko.mapping.fromJS(fi.api.states, statesMapping);
            $.event.trigger({
                type: 'statesViewmodelCreated',
                message: { textStatus: event.message.textStatus }
            });
            $(document).bind('stateSelected', function (event) {
                onStateSelected(event.message.state);
            });
        });
        return {
            getNewProfileQueryVm: getNewProfileQueryVm,
            profileQueryVm: profileQueryVm,
            statesVm: statesVm,
            getStatesVm: getStatesVm
        }
    }()

})
