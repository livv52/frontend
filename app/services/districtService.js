'use strict';

angular.module('myApp.districtService', [])
.service('districtService',['$http', function ($http) {
    
    this.list = function () { 
        return $http.get('http://localhost:53712/district/list');
    };

    this.getStores = function(districtid){
        return $http.get('http://localhost:53712/district/' + districtid +'/stores');
    }

    this.getSalesPerson = function(districtid){
        return $http.get('http://localhost:53712/district/' + districtid +'/salesperson');
    }

    this.insert = function (district){
        var req = {
            method: 'POST',
            url: 'http://localhost:53712/district/insert',
            headers: {
              'Content-Type': 'application/json'
            },
            data: district
           }
           
          return $http(req);

    };

}]);