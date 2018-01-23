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

        $scope.addsp = { Description: "" };

        salespersonService.list().success(function (data) {
            $scope.salesperson = data;
        });

        $scope.setSelected = function (index) {

            $scope.selected = index;
            console.log($scope.selected);
            salespersonService.getDistricts($scope.selected).success(function (data) {
                $scope.districts = data;
            });

        }

        $scope.setSelectedSp = function (item) {

            $scope.selectedsp = item;
            $scope.changeView (false, true, false);
            console.log($scope.selectedsp);
        }

        $scope.addclicked = function () {
            $scope.changeView (true, false, false);
            $scope.selected = 0;
            $scope.addsp = { Description: "" };

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            if ($scope.isAddClicked == true) {
                salespersonService.insert($scope.addsp).then(function () {
                    $scope.changeView(false,false,false);
                    $scope.refresh();
                });
            }
            else {
                salespersonService.update($scope.addsp).then(function () {
                    $scope.changeView(false,true,false);
                    $scope.refresh();
                });
            }



        }

        $scope.updateSalesperson = function (item) {
            $scope.addsp = item;
            $scope.changeView (false, false, true);
          }

        $scope.deleteSalesperson = function (item) {
            salespersonService.delete($scope.selectedsp).then(function () {
                $scope.isSelectedSp = false;
                $scope.selected = 0;
                $scope.refresh();
            });
        }

        $scope.refresh = function () {
            salespersonService.list().success(function (data) {
                $scope.salesperson = data;
            });
        }

        $scope.changeView = function (add, select, update) {
            $scope.isAddClicked = add;
            $scope.isSelectedSp = select;
            $scope.isUpdate = update;
        }



    }]);