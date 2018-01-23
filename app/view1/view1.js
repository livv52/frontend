'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http','$scope','districtService',function($http,$scope,districtService) {
  
  $scope.district= [];

  districtService.list().success(function(data){
    $scope.district = data;
  });
 
  
  $scope.setSelected = function(index){

    $scope.selected = index;
  }

  $scope.setDistrict = function (districtid){
    districtService.getStores(districtid).success(function(data){
      $scope.stores = data;
    }); 

    districtService.getSalesPerson(districtid).success(function(data){
      $scope.salesperson = data;
    }); 
    
  }
  
}]);