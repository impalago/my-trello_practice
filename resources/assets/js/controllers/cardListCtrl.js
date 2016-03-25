/* @ngInject */

angular.module('app').controller('cardListCtrl', function($scope, $uibModal, $routeParams, cardListFactory, cfpLoadingBar) {

    var $self = this;
    $scope.init = function() {
        $scope.cardList();

        $scope.loadStart = function() {
            cfpLoadingBar.start();
        };

        $scope.loadComplete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loadStart();
        $scope.fakeIntro = true;
    };

    $scope.printArray = function(arr){
        return '[' + arr.toString().replace(/([^,]+)/g, '"$1"').replace(/,/g, ', ') + ']';
    };

    $scope.cardList = function() {
        cardListFactory.getAllCardList()
            .then(function(rec) {
                $self.allCardList = rec;
                $scope.allCardList = rec;
                $scope.loadComplete();
                $scope.fakeIntro = false;
            });
    };

    $scope.$watchCollection('allCardList', function(newArr, oldArr) {
        cardListFactory.watchAllCardList(newArr)
            .then(function() {

            });
    });

    $self.createCardList = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create card list';
                $scope.cardListSubmit = function() {
                    if($scope.cardListForm.$valid) {
                        $scope.cardListFields.board_id = $routeParams.id;
                        cardListFactory.createCardList($scope.cardListFields)
                            .then(function() {
                                $uibModalInstance.close();
                            });
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.cardList();
        });
    };

    $self.editCardList = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Edit card list';
                cardListFactory.editCardList(id)
                    .then(function(rec) {
                        $scope.cardListFields = { name: '', color: '' };
                        $scope.cardListName = rec.name;
                        $scope.colorcardListColor = rec.color;
                        $scope.cardListSubmit = function() {
                            if($scope.cardListFields.name != rec.name || $scope.cardListFields.color) {
                                $scope.cardListFields.board_id = $routeParams.id;
                                $scope.cardListFields.name = !$scope.cardListFields.name ? rec.name : $scope.cardListFields.name;
                                $scope.cardListFields.color = !$scope.cardListFields.color ? rec.color : $scope.cardListFields.color;
                                cardListFactory.updateCardList(id, $scope.cardListFields)
                                    .then(function() {
                                        modalInstance.close();
                                    });
                            } else {
                                $uibModalInstance.dismiss('cancel');
                            }
                        };

                    });

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.cardList();
        });
    };

    $self.deleteCardList = function(id) {
        $.confirm({
            title: 'Are you sure?',
            confirm: function(){
                cardListFactory.deleteCardList(id)
                    .then(function(rec) {
                        new PNotify({
                            title: 'Info',
                            text: 'List of cards successfully removed',
                            type: 'info',
                            delay: 3000
                        });
                        $scope.cardList();
                    });
            }
        });
    };

    $scope.init();
});