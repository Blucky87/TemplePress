angular.module('app.controllers', [])
  
.controller('bookCtrl', function($scope) {

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

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
});
 