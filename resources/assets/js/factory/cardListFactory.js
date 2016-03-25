/* @ngInject */

angular.module('app').factory('cardListFactory', function($http, $routeParams) {
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
});