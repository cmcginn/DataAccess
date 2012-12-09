function InitializeApplication() {
    if (typeof (console) != 'undefined' && console)
        console.info("InitializeApplication starting ...");

    // Initialize our page-wide settings
    var pageSettings = { defaultProfileQueryName: 'New Profile Query' }

    // Create / launch our view mediator(s)
    fi.mediator.userprofilequery.createViewMediator(pageSettings);

    if (typeof(console) != 'undefined' && console)
        console.info("InitializeApplication done ...");
}
