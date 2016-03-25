/* @ngInject */

angular.module('app', ['ngRoute', 'ui.bootstrap', 'colorpicker.module', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-sortable-view'])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });