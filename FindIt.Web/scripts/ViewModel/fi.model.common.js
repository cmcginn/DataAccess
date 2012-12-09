// Lazy initialize our namespace context: fi.mediator.userprofilequery
if (typeof (fi) == 'undefined') fi = {}
if (typeof (fi.cmodel) == 'undefined') fi.model = {}
if (typeof (fi.model.common) == 'undefined') fi.model.common = {}

fi.model.common.statemap = {
    key:function(data){
        return ko.utils.unwrapObservable(data.code);
    },
    'create': function(options){
        var item = {
            id: options.data.id,
            code: options.data.code,
            name: options.data.name,
            selected: ko.observable(false),
            citis:ko.observableArray([])
        }
        return item;
    }
}