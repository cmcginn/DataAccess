// Lazy initialize our namespace context: fi.mediator.userprofilequery
if (typeof (fi) == 'undefined') fi = {}
if (typeof (fi.mediator) == 'undefined') fi.mediator = {}
if (typeof (fi.mediator.userprofilequery) == 'undefined') fi.mediator.userprofilequery = {}

if (typeof (console) != 'undefined' && console) console.info("fi.mediator.userprofilequery loading!");

fi.mediator.userprofilequery.createViewMediator = function (pageSettings) {
    // Create the view Savings Goal view-specific view model
    var viewModel = fi.model.userprofilequery.initializeViewModel(pageSettings);

    // Declare the HTML element-level data bindings
    $("#profile-query-name").attr("data-bind", "value: profileQueryName");
    $("#profile-query-locations").attr("data-bind", "with: profileQueryLocations");
    $("#profile-query-keywords").attr("data-bind", "with: profileQueryKeywords");
    var viewNode = $('#user-profile-query-view')[0];
    $(document).bind('initialDataLoaded', function (event) {
        // Ask KnockoutJS to data-bind the view model to the view
        ko.applyBindings(viewModel, viewNode);
        // Save the view model
        fi.mediator.userprofilequery.setViewModel(viewModel);
        if (typeof (console) != 'undefined' && console) console.info("fi.mediator.userprofilequery ready!")
    });
    fi.mediator.userprofilequery.loadInitialData(viewModel);

}
fi.mediator.userprofilequery.loadInitialData= function(viewModel){
    $(document).bind('statesReceived',function(event){
        viewModel.profileQueryLocations = ko.mapping.fromJS(fi.api.states);
        $.event.trigger({
            type: 'initialDataLoaded',
            message: { textStatus: event.message.textStatus },
            time: new Date()
        });
    });
    fi.api.getStates();
}
fi.mediator.userprofilequery.getViewModel = function () {
    return $(document).data("fi.model.userprofilequery.viewmodel");
}

fi.mediator.userprofilequery.setViewModel = function (viewModel) {
    $(document).data("fi.model.userprofilequery.viewmodel", viewModel);
}