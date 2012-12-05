var indexUI = {
    statesLayout: function () {
        $('.state').accordion({
            active: false,
            collapsible: true,
            beforeActivate: function (event) {
                index.stateSelected(this);
            }
        });
    },
    profileQueryLayout: function () {
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
        $.event.trigger({
            type: 'uiUpdated',
            message: { node: 'profileQuery' },
            time: new Date()
        });
    },
    profileQueriesLayout: function () {
        $('.select_profile_query').button({
            icons: {
                primary: 'ui-icon-pencil'
            },
        }).click(function () {
            index.loadProfileQuery($(this).attr('id'));
        });
    },
    init: function () {
        $('#index').bind('viewModelUpdated', function (e) {
            switch (e.message.root) {
                case 'states':
                    $('#profileQueries').hide();
                    indexUI.profileQueryLayout();
                    indexUI.statesLayout();
                    break;
                case 'profileQueries':
                    indexUI.profileQueriesLayout();
                    break;
                case 'profileQuery':
                                      
                    index.loadStates();
                    break;           
                default:
                    break;
            }
        });
        $('#index').bind('uiUpdated', function (e) {
            switch (e.message.node) {
                case 'profileQuery':
                    //indexUI.statesLayout();
                    break;
                default:
                    break;
            }
        });
        index.loadProfileQueries();
    }
}
$(function () {
    indexUI.init();
});