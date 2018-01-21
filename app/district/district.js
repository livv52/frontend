'use strict';

angular.module('myApp.district', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/district', {
            templateUrl: 'district/district.html',
            controller: 'districtCtrl'
        });
    }])

    .controller('districtCtrl', ['$scope', 'storeService','districtService','salespersonService', function ($scope, storeService, districtService, salespersonService) {

         $scope.adddt = { };
         $scope.adddt.SalesPersons = [{"SPId":"" ,"Position":""}];
         $scope.multiplePrimaries = false;
        
         salespersonService.list().success(function (data) {
            $scope.salesperson = data;
        });

        districtService.list().success(function(data){
            $scope.districts = data;
          });

        $scope.setSelected = function (index) {

            $scope.selected = index;
            console.log($scope.selected);

        }

        $scope.setSelectedDt = function (item) {

            $scope.selecteddt = item;
            $scope.isUpdate = false;            
            $scope.isAddClicked = false;
            $scope.isSelectedDt = true;
            console.log($scope.selecteddt);

        }

        $scope.addclicked = function () {

            $scope.isUpdate = false;
            $scope.isSelectedDt = false;
            $scope.isAddClicked = true;
            $scope.selected = 0 ;

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            let count = 0;
            $scope.multiplePrimaries = false;
            for(var item in $scope.adddt.SalesPersons)
            {   
                
                if($scope.adddt.SalesPersons[item].Position === "Primary"){
                    count += 1;
                }

                if(count > 1)
                {
                   $scope.multiplePrimaries = true;
                    return null;
                }
              
            }
            if ($scope.isAddClicked == true){
                console.log($scope.adddt)
                districtService.insert($scope.adddt).then(function () {
                    districtService.list().success(function (data) {
                        $scope.district = data;
                    });
                });
            }
            else
            {
                districtService.update($scope.adddt).then(function () {
                    districtService.list().success(function (data) {
                        $scope.district = data;
                    });
                });
            }
        


        }
        
        $scope.updateDistrict = function (item){
            console.log("PUla belita");
            $scope.adddt = item;
            $scope.isAddClicked = false;
            $scope.isSelectedDt = false;
            $scope.isUpdate = true;
            


        }


        $scope.deleteDistrict = function (item){
            districtService.delete($scope.selecteddt).then(function () {
                $scope.isSelectedDt = false;
                $scope.selected = 0;
                districtService.list().success(function (data) {
                    $scope.district = data;
                });
            });

        }

        $scope.pushNewSp = function (){
            $scope.adddt.SalesPersons.push({"SPId":"" ,"Position":""})
        }

    }]);