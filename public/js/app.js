angular.module('app', ['ngRoute', 'ui.bootstrap', 'colorpicker.module', 'chieffancypants.loadingBar', 'ngAnimate', 'angular-sortable-view'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    }]);
/**
 *  Initialize the material design
 */
$.material.init();
angular.module('app').config(function($routeProvider) {

    $routeProvider

        .when('/boards', {
            templateUrl: '/api/boards-main',
            controller: 'boardsCtrl'
        })

        .when('/boards/:id', {
            templateUrl: '/api/boards-item',
            controller: 'boardItemCtrl'
        });

});

angular.module('app').controller('boardItemCtrl', function($scope, $uibModal, $routeParams, boardItemFactory) {
    $scope.init = function() {

    };

     boardItemFactory.getBoardInfo($routeParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });

    $scope.init();
});

angular.module('app').controller('boardsCtrl', function($scope, boardsFactory, $uibModal, cfpLoadingBar) {

    $scope.init = function() {
        $scope.allBoards();
        $scope.board = {
            name: ''
        };

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
            controller: function($scope, $uibModalInstance) {
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
            }
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.editBoard = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/boards-create-form',
            controller: function($scope, $uibModalInstance) {
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
            }
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
                        $scope.allBoards();
                    });
            }
        });
    };

    $scope.init();
});
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

    $scope.cardList = function() {
        cardListFactory.getAllCardList()
            .then(function(rec) {
                $self.allCardList = rec;
                $scope.loadComplete();
                $scope.fakeIntro = false;
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

    $scope.init();
});
angular.module('app').factory('boardItemFactory', function($http, $q) {

    var board = this;

    board.getBoardInfo = function(id) {
        var defer = $q.defer();
        $http.get('/api/boards/' + id)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err) {
                deref.reject(err);
            });
        return defer.promise;
    };

    return board;
});
angular.module('app').factory('boardsFactory', function($http, $q) {

    var board = this;
    this.boardList = {};

    board.getBoards = function() {
        var defer = $q.defer();

        $http.get('/api/boards')
            .success(function(rec) {
                board.boardList = rec;
                defer.resolve(rec);
            }).error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.createBoard = function(board) {
        var defer = $q.defer();
        $http.post('/api/boards', board)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.editBoard = function(id) {
        var defer = $q.defer();
        $http.get('/api/boards/' + id + '/edit')
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.updateBoard = function(id, board) {
        var defer = $q.defer();
        $http.put('/api/boards/' + id, board)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    board.deleteBoard = function(id) {
        var defer = $q.defer();

        $http.delete('/api/boards/' + id)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    return board;
});
angular.module('app').factory('cardListFactory', function($http, $q, $routeParams) {
    var cardList = {};

    cardList.getAllCardList = function() {
        var defer = $q.defer();
        $http.get('/api/card-list', {
            params: {
                board_id: $routeParams.id
            }
        })
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    cardList.createCardList = function(cardList) {
        var defer = $q.defer();
        $http.post('/api/card-list', cardList)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    cardList.editCardList = function(id) {
        var defer = $q.defer();
        $http.get('/api/card-list/' + id + '/edit')
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    cardList.updateCardList = function(id, cardList) {
        var defer = $q.defer();
        $http.put('/api/card-list/' + id, cardList)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    cardList.deleteCardList = function(id) {
        var defer = $q.defer();

        $http.delete('/api/card-list/' + id)
            .success(function(rec) {
                defer.resolve(rec);
            })
            .error(function(err, status) {
                defer.reject(err);
            });

        return defer.promise;
    };

    return cardList;
});
//# sourceMappingURL=app.js.map
