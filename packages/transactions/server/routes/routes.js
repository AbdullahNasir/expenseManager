'use strict';

var transactionController = require('../controllers/transactionsController');


// The Package is past automatically as first parameter
module.exports = function(Transactions, app, auth, database) {

    app.get('/transactions/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/transactions/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/transactions/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.post('transaction/new',auth.requiresLogin,transactionController.Transaction);

    app.post('transaction/update/:transactionId',auth.requiresLogin,transactionController.Update);

    app.get('transactions',auth.requiresLogin,transactionController.transactions);


};
