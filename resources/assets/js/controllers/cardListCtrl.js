angular.module('app').controller('cardListCtrl', function($scope, $uibModal, $routeParams, cardListFactory) {

    var $self = this;
    $scope.init = function() {
        $scope.cardList();
    };

    $scope.cardList = function() {
        cardListFactory.getAllCardList()
            .then(function(rec) {
                $self.allCardList = rec;
            });
    };

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
                        $scope.cardList();
                    });
            }
        });
    };

    $self.dragoverCallback = function(event, index, external, type) {
        console.log(index);
    };

    $self.dropCallback = function(event, index, item, external, type, allowedType) {
        $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.label) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }
        return item;
    };

    $self.logEvent = function(message, event) {
        console.log(message, '(triggered by the following', event.type, 'event)');
        console.log(event);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element is ' + action + ' position ' + index;
        $scope.logEvent(message, event);
    };


    $scope.init();
});