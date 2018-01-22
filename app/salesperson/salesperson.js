'use strict';

angular.module('myApp.salesperson', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/salesperson', {
            templateUrl: 'salesperson/salesperson.html',
            controller: 'SalesPersonCtrl'
        });
    }])

    .controller('SalesPersonCtrl', ['$scope', 'salespersonService', function ($scope, salespersonService) {

        $scope.districts = [];

        $scope.addsp = { Description: ""};
        salespersonService.list().success(function (data) {
            $scope.salesperson = data;
        });

        $scope.setSelected = function (index) {

            $scope.selected = index;
            console.log($scope.selected);
            salespersonService.getDistricts($scope.selected).success(function(data){
                console.log("puta");
                $scope.districts = data;
              }); 

        }

        $scope.setSelectedSp = function (item) {

            $scope.selectedsp = item;
            $scope.isUpdate = false;            
            $scope.isAddClicked = false;
            $scope.isSelectedSp = true;
            console.log($scope.selectedsp);
        }

        $scope.addclicked = function () {

            $scope.isUpdate = false;
            $scope.isSelectedSp = false;
            $scope.isAddClicked = true;
            $scope.selected = 0 ;

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            if ($scope.isAddClicked == true){
                salespersonService.insert($scope.addsp).then(function () {
                    salespersonService.list().success(function (data) {
                        $scope.salesperson = data;
                    });
                });
            }
            else
            {
                salespersonService.update($scope.addsp).then(function () {
                    salespersonService.list().success(function (data) {
                        $scope.salesperson = data;
                    });
                });
            }
        


        }
        
        $scope.updateSalesperson = function (item){
            console.log("PUla belita");
            $scope.addsp = item;
            $scope.isAddClicked = false;
            $scope.isSelectedSp = false;
            $scope.isUpdate = true;
            


        }

        $scope.deleteSalesperson = function (item){
            salespersonService.delete($scope.selectedsp).then(function () {
                $scope.isSelectedSp = false;
                $scope.selected = 0;
                salespersonService.list().success(function (data) {
                    $scope.salesperson = data;
                });
            }); }

            

    }]);