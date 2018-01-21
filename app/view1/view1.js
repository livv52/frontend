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
/*
  $http.get('http://localhost:53712/district/list').success(function(data){
    $scope.district= data;
    console.log($scope.district);
  })
  */

  districtService.list().success(function(data){
    $scope.district = data;
  });
 
  
  $scope.setSelected = function(index){

    $scope.selected = index;
    console.log($scope.selected);
  }

  $scope.setDistrict = function (districtid){
    districtService.getStores(districtid).success(function(data){
      $scope.stores = data;
      console.log($scope.stores);
    }); 

    districtService.getSalesPerson(districtid).success(function(data){
      $scope.salesperson = data;
      console.log($scope.salesperson);
    }); 
    
  }
  
}]);