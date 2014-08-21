'use strict';

angular.module('mean.transactions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('transactions example page', {
            url: '/transactions/example',
            templateUrl: 'transactions/views/index.html'
        });
    }
]);
