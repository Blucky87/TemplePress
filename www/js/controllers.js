angular.module('app.controllers', [])
  
.controller('bookCtrl', function($scope, $http) {

    $scope.testPHP = function(){
        $http.get('php/tester.php').then(function(response){
            $scope.testResult = "Success: [" + response.data +"]";
        },function(response){
            $scope.testResult = "Failed: [" + response.data + "]";
        });
    }

})
      
.controller('locationsCtrl', function($scope) {

})
   
.controller('cameraCtrl', function($scope) {

})
   
.controller('historicalSite1Ctrl', function($scope) {

})
   
.controller('historicalSite2Ctrl', function($scope) {

})
   
.controller('historicalSiteNCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('routesCtrl', function($scope) {



})

.controller('MyCtrl', function($scope, Camera) {
    $scope.photos = [];

    $scope.getPhoto = function() {
     Camera.getPicture().then(
      function(imageURI) {
        console.log(imageURI);
        $scope.photos.push(imageURI);
      }, 
      function(err) {
        console.err(err);
    });
  };



});
 