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