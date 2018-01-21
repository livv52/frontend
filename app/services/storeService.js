'use strict';

angular.module('myApp.storeService', [])
.service('storeService',['$http', function ($http) {
    
    this.list = function () { 
        return $http.get('http://localhost:53712/store/list');
    };

    this.insert = function (store){
        var req = {
            method: 'POST',
            url: 'http://localhost:53712/store/insert',
            headers: {
              'Content-Type': 'application/json'
            },
            data: store
           }
           
          return $http(req);

    };

    this.update = function (store){

        var req = {
            method: 'PUT',
            url: 'http://localhost:53712/store/update',
            headers: {
              'Content-Type': 'application/json'
            },
            data: store
           }
           
          return $http(req);

    }

    this.delete = function (store){

        var req = {
            method: 'DELETE',
            url: 'http://localhost:53712/store/delete/' + store.StoreId,
            data: store
           }
           
          return $http(req);
        
    }

}]);