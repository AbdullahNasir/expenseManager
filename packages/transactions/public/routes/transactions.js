'use strict';

angular.module('mean.transactions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('transactions', {
            url: '/transactions',
            templateUrl: 'transactions/views/index.html'
        });
        $stateProvider.state('transactions.expense',{
            url:'/expense',
            templateUrl:'transactions/views/expense.html'
        });
        $stateProvider.state('transactions.income',{
            url:'/income',
            templateUrl:'transactions/views/income.html'
        });
        $stateProvider.state('transactions.summary',{
            url:'/summary',
            templateUrl:'transactions/views/summary.html'
        });
    }
]);
