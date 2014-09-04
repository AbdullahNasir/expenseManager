'use strict';

angular.module('mean.transactions').factory('transactionsService', ['$http',
    function($http) {

        function newTransaction(date,type,amount,description,tags){
            return $http.post('/transaction/new',{
                date:date,
                type:type,
                amount:amount,
                description:description,
                tags:tags
            });
        }

        function getMonthlyTransactions(month){
            return $http.get('/transactions/monthly?month='+month);
        }

        return {
            newTransaction:newTransaction,
            monthlyTransactions:getMonthlyTransactions
        };
    }
]);
