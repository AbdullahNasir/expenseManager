'use strict';

angular.module('mean.transactions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('transactions', {
            url: '/transactions',
            templateUrl: 'transactions/views/index.html'
        });
        $stateProvider.state('transactions.expense',{
            url:'/transactions/expense',
            templateUrl:'transactions/views/expense.html'
        });
        $stateProvider.state('transactions.income',{
            url:'/transactions/income',
            templateUrl:'transactions/views/income.html'
        });
    }
]);
