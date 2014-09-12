'use strict';

var TransactionController = function ($scope, $rootScope, $modalInstance, Params) {
    $scope.modalOptions = Params.modalOptions;
    $scope.modalData = Params.modalData;

    if(!$scope.modalData.transaction){
        $scope.transaction = {};
    }else{
        $scope.transaction = $scope.modalData.transaction;
        $scope.transaction.date = $scope.transaction.date.substr(0,10);
    }

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

angular.module('mean.transactions').controller('TransactionsController', ['$rootScope','$scope', 'Global','transactionsService','modalService',
    function($rootScope,$scope, Global,transactionsService,modalService) {
        $scope.global = Global;
        $scope.package = {
            name: 'transactions'
        };

        $scope.months = ['January','Feburary','March','April','May','June','July','August',
                     'September','October','November','December'];
        $scope.choosenMonth = new Date().getMonth();


        $scope.transactions= {};

        $scope.initExpense = function(){
            transactionsService.monthlyTransactions($scope.choosenMonth,'expense').then(function(response){
                  console.log(response.data);
                  $scope.transactions = response.data;
            });
        };

        $scope.nextMonth = function(){
            if($scope.choosenMonth === 11)
                return;
            $scope.choosenMonth+=1;
            $scope.initExpense();
        };

        $scope.prevMonth = function(){
            if($scope.choosenMonth === 0)
                return;
            $scope.choosenMonth-=1;
            $scope.initExpense();
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

                    transactionsService.newTransaction(transaction.date,'expense',transaction.amount,transaction.description,transaction.tags)
                        .success(function(response){
                            console.log(response);
                            modalService.success({
                                headerText: 'Expense Saved',
                                bodyText: 'Transaction saved successfully'
                            });

                            // triggers an event of "transaction.save"
                            $scope.initExpense();
                        }).error(function(response){
                            console.log(response);
                        });



            }, function () {

            });
        };

        $scope.editTransaction = function(transaction){

            console.log(transaction);

            transaction = {transaction:transaction};


            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Update',
                headerText: 'Update',
                templateUrl: 'transactions/views/transaction.html'
            };

            modalService.dialog(modalOptions,JSON.parse(JSON.stringify(transaction)),TransactionController).then(function(transaction){
                console.log('out of modal');
                console.log(transaction);
                transactionsService.updateTransaction(transaction._id,transaction.date,'expense',transaction.amount,transaction.description,transaction.tags)
                    .then(function(response){
                        console.log(response.data);
                    }).error(function(response){
                        console.log(response.data);
                    })
            },function(){

            });
        };

    }



]);


