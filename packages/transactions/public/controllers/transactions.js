'use strict';

var TransactionController = function ($scope, $rootScope, $modalInstance, Params) {
    $scope.modalOptions = Params.modalOptions;


    $scope.transaction = {};
    // return with success
    $scope.ok = function () {
        console.log($scope.transaction);
        $modalInstance.close($scope.transaction);
    };

    // return as cancel
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

};

angular.module('mean.transactions').controller('TransactionsController', ['$rootScope','$scope', 'Global','modalService', 'Transactions',
    function($rootScope,$scope, Global,modalService, Transactions) {
        $scope.global = Global;
        $scope.package = {
            name: 'transactions'
        };

        $scope.newTransaction = function(){
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Save',
                headerText: 'New Transaction',
                templateUrl: 'transactions/views/transaction.html'
            };



            modalService.dialog(modalOptions, {}, TransactionController).then(function (transaction) {

                    console.log(transaction);

                    modalService.success({
                        headerText: 'Expense Saved',
                        bodyText: 'Transaction saved successfully'
                    });

                    // triggers an event of "transaction.save"
                    $rootScope.$broadcast('transaction.save');

            }, function () {

            });
        };
    }



]);


