'use strict';

angular.module('mean.transactions').controller('TransactionsController', ['$scope', 'Global', 'Transactions',
    function($scope, Global, Transactions) {
        $scope.global = Global;
        $scope.package = {
            name: 'transactions'
        };
    }
]);
