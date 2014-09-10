'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Transactions = new Module('transactions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Transactions.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Transactions.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Transactions.menus.add({
        title: 'transactions example page',
        link: 'transactions example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    Transactions.angularDependencies([
        // Angular modules
       'angularMoment'
    ]);

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Transactions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Transactions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Transactions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Transactions;
});
