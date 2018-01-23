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
            $scope.changeView(false,true,false);
            console.log($scope.selectedst);

        }

        $scope.addclicked = function () {
            $scope.changeView(true,false,false);
            $scope.selected = 0 ;
            $scope.addst = { };

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            if ($scope.isAddClicked == true){
                console.log($scope.addst)
                storeService.insert($scope.addst).then(function () {
                    $scope.changeView(false,false,false);
                    $scope.refresh();
                });
            }
            else
            {
                storeService.update($scope.addst).then(function () {
                    $scope.changeView(false,true,false);
                    $scope.refresh();
                });
            }
        


        }
        
        $scope.updateStore = function (item){
            $scope.addst = item;
            console.log($scope.addst);
            $scope.addst.DistrictId = "" + $scope.addst.DistrictId ;
            $scope.changeView(false,false,true);
        }

        $scope.deleteStore = function (item){
            storeService.delete($scope.selectedst).then(function () {
                $scope.isSelectedSt = false;
                $scope.selected = 0;
                $scope.refresh();
            });
         }

         $scope.changeView = function(add,select,update){
            $scope.isAddClicked = add;
            $scope.isSelectedSt = select;
            $scope.isUpdate = update;
           }

        $scope.refresh = function(){
            storeService.list().success(function (data) {
                        $scope.store = data;
                    });
           }

    }]);