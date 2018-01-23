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
         $scope.sameDistrictName = false;
         $scope.atLeastPrimary = false;
         $scope.salespersons = [];
        
        

         salespersonService.list().success(function (data) {
            $scope.salesperson = data;
        });

        districtService.list().success(function(data){
            $scope.districts = data;
          });

        $scope.setSelected = function (index) {

            $scope.selected = index;
            console.log($scope.selected);

            districtService.getSalesPerson( $scope.selected).success(function(data){
                $scope.salespersons = data;
                console.log($scope.salespersons);
              }); 

        }

        $scope.setSelectedDt = function (item) {
            $scope.selecteddt = item;
            $scope.changeView(false,true,false);
            $scope.clearError();
           

        }

        $scope.addclicked = function () {
            $scope.changeView(true,false,false);
            $scope.selected = 0 ;
            $scope.adddt = { };
            $scope.adddt.SalesPersons = [{"SPId":"" ,"Position":""}];
            $scope.clearError();

        }

        $scope.onSubmit = function (isValid) {
            console.log(isValid);
            let count = 0;
            $scope.multiplePrimaries = false;
            $scope.sameDistrictName = false;
            $scope.atLeastPrimary = false;
           
          
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
            if(count < 1){
                $scope.atLeastPrimary  = true;
                return null;
            }
           
            if ($scope.isAddClicked == true){
                for(var name in $scope.districts)
                {   
                    
                    if( $scope.districts[name].Name === $scope.adddt.Name){
                        $scope.sameDistrictName = true;
                         return null;
                    }              
                }
                districtService.insert($scope.adddt).then(function () {
                    $scope.changeView(false,false,false);
                    $scope.refresh();
                });
            }
            else
            {
                districtService.update($scope.adddt).then(function () {
                    $scope.changeView(false,false,false);
                    $scope.refresh();
                });
            }
        


        }

        
        $scope.updateDistrict = function (item){
            districtService.getSalesPerson(item.DistrictId).success(function(data){
                $scope.adddt = item;
                $scope.adddt.SalesPersons = data;
                for(var element in $scope.adddt.SalesPersons)
                {
                    $scope.adddt.SalesPersons[element].SPId = "" + $scope.adddt.SalesPersons[element].SPId;
                }
                $scope.changeView(false,false,true);
                $scope.clearError();
              }); 
           
        }


        $scope.deleteDistrict = function (item){
            districtService.delete($scope.selecteddt).then(function () {
                $scope.isSelectedDt = false;
                $scope.selected = 0;
                $scope.refresh();
                
            });

        }

        $scope.setDistrict = function (districtid){
            districtService.getStores(districtid).success(function(data){
              $scope.stores = data;
              console.log($scope.stores);
            }); 
        
            // districtService.getSalesPerson(districtid).success(function(data){
            //   $scope.salesperson = data;
            //   console.log($scope.salesperson);
            // }); 
            
          }

        $scope.pushNewSp = function (){
            $scope.adddt.SalesPersons.push({"SPId":"" ,"Position":""})
        }
        $scope.removeSp = function(item){
            let index = $scope.adddt.SalesPersons.indexOf(item);
            $scope.adddt.SalesPersons.splice(index,1);
        }

       $scope.refresh = function(){
        districtService.list().success(function(data){
            $scope.districts = data;
          });
       }

       $scope.changeView = function(add,select,update){
        $scope.isAddClicked = add;
        $scope.isSelectedDt = select;
        $scope.isUpdate = update;
       }

       $scope.clearError= function(){
        $scope.multiplePrimaries = false;
        $scope.sameDistrictName = false;
        $scope.atLeastPrimary = false;
       }

    }]);