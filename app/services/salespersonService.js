'use strict';

angular.module('myApp.salespersonService', [])
.service('salespersonService',['$http', function ($http) {
    
    this.list = function () { 
        return $http.get('http://localhost:53712/salesperson/list');
    };

    this.insert = function (salesperson){
        var req = {
            method: 'POST',
            url: 'http://localhost:53712/salesperson/insert',
            headers: {
              'Content-Type': 'application/json'
            },
            data: salesperson
           }
           
          return $http(req);

    };

    this.update = function (salesperson){

        var req = {
            method: 'PUT',
            url: 'http://localhost:53712/salesperson/update',
            headers: {
              'Content-Type': 'application/json'
            },
            data: salesperson
           }
           
          return $http(req);

    }

    this.delete = function (salesperson){

        var req = {
            method: 'DELETE',
            url: 'http://localhost:53712/salesperson/delete/' + salesperson.SPId,
            data: salesperson
           }
           
          return $http(req);
        
    }

    this.getDistricts = function(id){
        return $http.get('http://localhost:53712/salesperson/districts/'+ id);
    }


}]);