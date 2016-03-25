/* @ngInject */

angular.module('app', ['ngRoute', 'ui.bootstrap', 'colorpicker.module', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-sortable-view'])
    .config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    }]);
/**
 *  Initialize the material design
 */
$.material.init();
angular.module('app').config(["$routeProvider", function($routeProvider) {

    $routeProvider

        .when('/boards', {
            templateUrl: '/api/boards-main',
            controller: 'boardsCtrl'
        })

        .when('/boards/:id', {
            templateUrl: '/api/boards-item',
            controller: 'boardItemCtrl'
        });

}]);

/* @ngInject */

angular.module('app').controller('boardItemCtrl', ["$scope", "$routeParams", "boardItemFactory", function($scope, $routeParams, boardItemFactory) {

    boardItemFactory.getBoardInfo($routeParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });
}]);

/* @ngInject */

angular.module('app').controller('boardsCtrl', ["$scope", "boardsFactory", "$uibModal", "cfpLoadingBar", function($scope, boardsFactory, $uibModal, cfpLoadingBar) {

    $scope.init = function() {
        $scope.allBoards();

        $scope.loadStart = function() {
            cfpLoadingBar.start();
        };

        $scope.loadComplete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loadStart();
        $scope.fakeIntro = true;
    };

    $scope.allBoards = function() {
        boardsFactory.getBoards()
            .then(function(rec) {
                $scope.boards = boardsFactory.boardList;
                $scope.loadComplete();
                $scope.fakeIntro = false;
            });
    };

    $scope.createBoard = function() {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create board';
                $scope.boardSubmit = function() {
                    if($scope.boardForm.$valid) {
                        boardsFactory.createBoard($scope.board)
                            .then(function() {
                                $uibModalInstance.close();
                            });
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }]
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.editBoard = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
                $scope.formTitle = 'Edit board';
                boardsFactory.editBoard(id)
                    .then(function(rec) {

                        $scope.boardName = rec.name;
                        $scope.boardSubmit = function() {
                            if($scope.boardForm.$valid) {
                                boardsFactory.updateBoard(id, $scope.board)
                                    .then(function() {
                                        $uibModalInstance.close();
                                    });
                            }
                        };

                    });

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }]
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.deleteBoard = function(id) {
        $.confirm({
            title: 'Are you sure?',
            content: 'The board to move to a basket!',
            confirm: function(){
                boardsFactory.deleteBoard(id)
                    .then(function(rec) {
                        new PNotify({
                            title: 'Info',
                            text: 'Board successfully removed',
                            type: 'info',
                            delay: 3000
                        });
                        $scope.allBoards();
                    });
            }
        });
    };

    $scope.init();
}]);
/* @ngInject */

angular.module('app').controller('cardCtrl', ["$scope", "cardFactory", "$uibModal", "cfpLoadingBar", function($scope, cardFactory, $uibModal, cfpLoadingBar) {

    $self = this;

    $scope.init = function() {
        $scope.getCards();
    };

    var cardListId = $('.card-list-item').data('card-list-id');
    console.log(cardListId);

    $scope.getCards = function() {

        cardFactory.getCards()
            .then(function(rec) {
                console.log(rec)
            });
    };

    $self.createCard = function(cardListId) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-create-form',
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create card';
                $scope.cardCreateSubmit = function() {
                    if($scope.cardCreateForm.$valid) {
                        $scope.cardFields.cardListId = cardListId;
                        cardFactory.createCard($scope.cardFields)
                            .then(function() {
                                $uibModalInstance.close();
                            });
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }]
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.init();
}]);
/* @ngInject */

angular.module('app').controller('cardListCtrl', ["$scope", "$uibModal", "$routeParams", "cardListFactory", "cfpLoadingBar", function($scope, $uibModal, $routeParams, cardListFactory, cfpLoadingBar) {

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
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
        });

        modalInstance.result.then(function() {
            $scope.cardList();
        });
    };

    $self.editCardList = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
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
}]);
/* @ngInject */

angular.module('app').factory('boardItemFactory', ["$http", function($http) {

    var board = this;

    board.getBoardInfo = function(id) {
        return $http.get('/api/boards/' + id)
            .then(function(rec) {
                return rec.data;
            });
    };

    return board;
}]);
/* @ngInject */

angular.module('app').factory('boardsFactory', ["$http", function($http) {

    var board = this;
    this.boardList = {};

    board.getBoards = function() {
        return $http.get('/api/boards')
            .then(function(rec) {
                board.boardList = rec.data;
                return rec.data;
            });
    };

    board.createBoard = function(board) {
        return $http.post('/api/boards', board);
    };

    board.editBoard = function(id) {
        return $http.get('/api/boards/' + id + '/edit')
            .then(function(rec) {
                return rec.data;
            });
    };

    board.updateBoard = function(id, board) {
        return $http.put('/api/boards/' + id, board);
    };

    board.deleteBoard = function(id) {
        return $http.delete('/api/boards/' + id)
    };

    return board;
}]);
/* @ngInject */

angular.module('app').factory('cardFactory', ["$http", function($http) {

    var card = {};

    card.getCards = function(cardListId) {
        return $http.get('/api/card', {
                params: {
                    cardListId: cardListId
                }
            })
            .then(function(rec) {
                return rec.data;
            });
    };

    card.createCard = function(card) {
        return $http.post('/api/card', card);
    };

    return card;
}]);
/* @ngInject */

angular.module('app').factory('cardListFactory', ["$http", "$routeParams", function($http, $routeParams) {
    var cardList = {};

    cardList.getAllCardList = function() {
        return $http.get('/api/card-list', {
                params: {
                    board_id: $routeParams.id
                }
            })
            .then(function (rec) {
                return rec.data;
            });
    };

    cardList.watchAllCardList = function(newArr) {
        return $http.post('/api/card-list-sorting', newArr)
            .then(function(rec) {
                return rec.data;
            });
    };

    cardList.createCardList = function(cardList) {
        return $http.post('/api/card-list', cardList);
    };

    cardList.editCardList = function(id) {
        return $http.get('/api/card-list/' + id + '/edit')
            .then(function(rec) {
                return rec.data;
            });
    };

    cardList.updateCardList = function(id, cardList) {
        return $http.put('/api/card-list/' + id, cardList)
    };

    cardList.deleteCardList = function(id) {
        return $http.delete('/api/card-list/' + id)
    };

    return cardList;
}]);