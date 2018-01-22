'use strict';

angular.module('myApp.store', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/store', {
            templateUrl: 'store/store.html',
            controller: 'storeCtrl'
        });
    }])

    .controller('storeCtrl', ['$scope', 'storeService','districtService', function ($scope, storeService, districtService) {

        $scope.addst = { };
        storeService.list().success(function (data) {
            $scope.store = data;
        });

        districtService.list().success(function(data){
            $scope.districts = data;
          });

        $scope.setSelected = function (index) {

            $scope.selected = index;
            console.log($scope.selected);

        }

        $scope.setSelectedSt = function (item) {

            $scope.selectedst = item;
            $scope.isUpdate = false;            
            $scope.isAddClicked = false;
            $scope.isSelectedSt = true;
            console.log($scope.selectedst);

        }

        $scope.addclicked = function () {

            $scope.isUpdate = false;
            $scope.isSelectedSt = false;
            $scope.isAddClicked = true;
            $scope.selected = 0 ;

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            if ($scope.isAddClicked == true){
                console.log($scope.addst)
                storeService.insert($scope.addst).then(function () {
                    $scope.isSelectedSt = false;
                    $scope.isUpdate = false;
                    $scope.isAddClicked = false;
                    storeService.list().success(function (data) {
                        $scope.store = data;
                    });
                });
            }
            else
            {
                storeService.update($scope.addst).then(function () {
                    $scope.isSelectedSt = true;
                    $scope.isUpdate = false;
                    $scope.isAddClicked = false;
                    storeService.list().success(function (data) {
                        $scope.store = data;
                    });
                });
            }
        


        }
        
        $scope.updateStore = function (item){
            console.log("PUla belita");
            $scope.addst = item;
            $scope.isAddClicked = false;
            $scope.isSelectedSt = false;
            $scope.isUpdate = true;
            


        }


        $scope.deleteStore = function (item){
            storeService.delete($scope.selectedst).then(function () {
                $scope.isSelectedSt = false;
                $scope.selected = 0;
                storeService.list().success(function (data) {
                    $scope.store = data;
                });
            });

        }

    }]);