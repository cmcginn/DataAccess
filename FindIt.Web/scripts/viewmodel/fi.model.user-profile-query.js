// Lazy initialize our namespace context: fi.model.userprofilequery
if (typeof (fi) == 'undefined') fi = {}
if (typeof (fi.model) == 'undefined') fi.model = {}
if (typeof (fi.model.userprofilequery) == 'undefined') fi.model.userprofilequery = {}
fi.model.userprofilequery.initializeViewModel = function (pageSettings) {
    // If pageSettings are not provided we'll initialize an empty object
    if (typeof (pageSettings) == 'undefined') var pageSettings = {}
    var viewModel = {
        profileQueryName: ko.observable(pageSettings.defaultProfileQueryName || 'New Query'),
        profileQueryLocations: ko.observableArray([]),
        profileQueryKeywords: ko.observableArray([])    
    }
    
    return viewModel;
}
