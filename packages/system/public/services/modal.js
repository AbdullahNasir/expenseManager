/**
 * Created by Abdullah on 8/26/14.
 */
'use strict';

angular.module('mean.system').factory('modalService', ['$modal', '$log',
    function($modal, $log) {
        var modals = {};

        var icons = {
            success: '<i class="fa fa-check"></i>',
            warning: '&#9888;',
            error: '&times;'
        };

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            windowClass: 'ft-modal',
            templateUrl: '/system/views/modal.html'
        };

        var modalOptions = {
            icon: '',
            showButtons: false,
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?',
            templateUrl: ''
        };

        var show = function (customModalDefaults, customModalOptions, customModalData) {

            customModalDefaults.backdrop = 'static';

            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);


            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance, Params) {
                    $scope.modalOptions = Params.modalOptions;
                    $scope.modalData = Params.modalData;

                    // return with success
                    $scope.ok = function () {
                        $modalInstance.close($scope.modalData);
                    };

                    // return as cancel
                    $scope.close = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };
            }

            tempModalDefaults.resolve = {
                Params: function() {
                    return {
                        modalOptions: tempModalOptions,
                        modalData: customModalData
                    };
                }
            };

            return $modal.open(tempModalDefaults).result;
        };

        /**
         * Opens Success notification modal
         *
         * @param customModalOptions.headerText     modal header text
         * @param customModalOptions.bodyText       modal body text(message)
         *
         * @returns promise
         */
        modals.success = function (customModalOptions) {
            var customModalDefaults = {};
            customModalDefaults.windowClass = 'ft-modal ft-success-modal';

            customModalOptions.type = 'success';
            customModalOptions.icon = icons.success;

            return show(customModalDefaults, customModalOptions);
        };

        /**
         * Opens Warning notification modal
         *
         * @param customModalOptions.headerText     modal header text
         * @param customModalOptions.bodyText       modal body text(message)
         *
         * @returns promise
         */
        modals.warning = function (customModalOptions) {
            var customModalDefaults = {};
            customModalDefaults.windowClass = 'ft-modal ft-warning-modal';

            customModalOptions.type = 'warning';
            customModalOptions.icon = icons.warning;

            return show(customModalDefaults, customModalOptions);
        };

        /**
         * Opens Error notification modal
         *
         * @param customModalOptions.headerText     modal header text
         * @param customModalOptions.bodyText       modal body text(message)
         *
         * @returns promise
         */
        modals.error = function (customModalOptions) {
            var customModalDefaults = {};
            customModalDefaults.windowClass = 'ft-modal ft-error-modal';

            customModalOptions.type = 'error';
            customModalOptions.icon = icons.error;

            return show(customModalDefaults, customModalOptions);
        };

        /**
         * Opens Confirm notification modal
         *
         * @param customModalOptions.closeButtonText modal close button text
         * @param customModalOptions.actionButtonText modal action button text
         * @param customModalOptions.headerText     modal header text
         * @param customModalOptions.bodyText       modal body text(message)
         *
         * @returns promise
         */
        modals.confirm = function (customModalOptions) {
            var customModalDefaults = {};
            customModalDefaults.windowClass = 'ft-modal ft-confirm-modal';

            customModalOptions.showButtons = true;

            return show(customModalDefaults, customModalOptions);
        };

        modals.dialog = function(customModalOptions, customModalData, controller) {
            var customModalDefaults = {};
            customModalDefaults.windowClass = 'ft-modal ft-dialog-modal';
            customModalDefaults.controller = controller;

            customModalOptions.showButtons = true;

            return show(customModalDefaults, customModalOptions, customModalData);
        };

        return modals;
    }
]);