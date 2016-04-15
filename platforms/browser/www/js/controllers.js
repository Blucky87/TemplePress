angular.module('app.controllers', [])
  
.controller('bookCtrl', function($scope, $http) {

    $scope.testPHP = function(){
        $http.get('http://otiose.io/php/test.php').then(function(response){
          console.log(response);
            $scope.testResult = "Success: [" + response +"]";
        },function(response){
          console.log(response);
            $scope.testResult = "Failed: [" + response.data + "]";
        });
    }

})


    .controller('locationdebugCtrl', function($scope, $ionicLoading, $compile, GeoLocationJSON) {

  $scope.updateLocation = function() {
    GeoLocationJSON.getCurrentGeoLocation().then(
      function(position){
        console.log(position);
        $scope.location = position;
      },function(err){

      });
  }



      $scope.init = function initialize(long,lat) {
        var site = new google.maps.LatLng($scope.location.coords.latitude, $scope.location.coords.longitude);
        var hospital = new google.maps.LatLng(39.952706, -75.163720);
      
        var mapOptions = {
          streetViewControl:true,
          center: site,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: site,
          map: map,
          title: 'Strathblane (Job Location)'
        });
        
        var hospitalRoute = new google.maps.Marker({
          position: hospital,
          map: map,
          title: 'Hospital (Stobhill)'
        });
        
        var infowindow = new google.maps.InfoWindow({
             content:"Project Location"
        });

        infowindow.open(map,marker);
        
        var hospitalwindow = new google.maps.InfoWindow({
             content:"Nearest Hospital"
        });

        hospitalwindow.open(map,hospitalRoute);
       
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin : site,
            destination : hospital,
            travelMode : google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(map); 
       
      }
  
      // google.maps.event.addDomListener(window, 'load', initialize);
    
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    })

// .controller('locationdebugCtrl',function($scope, GeoLocationJSON) {

//   // $scope.updateLocation = function() {
//   //   GeoLocationJSON.getCurrentGeoLocation().then(
//   //     function(position){
//   //       console.log(position);
//   //       $scope.location = position;
//   //     },function(err){

//   //     });
//   // }

// })
      
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
   
.controller('signupCtrl', function($scope, $http) {
  $scope.inputForm = {
    name: "",
    email: "",    
    username: "",
    password: "",
    rpassword: ""
  }

  $scope.submittal = function(event){
    var $btn = $(event.currentTarget);
    var status = false;
    var data = $scope.inputForm.email;

    if($scope.inputForm.password != $scope.inputForm.rpassword && ($scope.inputForm.rpassword != "" || $scope.inputForm.password != "")){
      $('.pwd').toggleClass('failed', true);
      $('.pwd').toggleClass('succeed', false);
    }else {
      $('.pwd').toggleClass('succeed', true);
      $('.pwd').toggleClass('failed', false);        
    }

    $http.post('otiose.io/php/IsAvailable.php', data).then(function(response){
      if(reponse.data === "true")
        status = true;
        data = response.data;
    }, function(response){
      //onFail
    });    

    if(status){
      $scope.inputForm.name = data;
    }else{
      $scope.inputForm.name = data;
    }

  }

})
   
.controller('routesCtrl', function($scope) {
  $scope.wayPoints = [];
  $scope.navMode = "car";

  $scope.navSelectBtn = function(event){
    var $target = $(event.currentTarget);
    $scope.navMode = $target.attr('name');

    if(!$target.hasClass('button-calm')){
      $target.parent().find('.button-calm').toggleClass('button-positive',true);
      $target.parent().find('.button-calm').toggleClass('button-calm',false);
      $target.toggleClass('button-calm', true);
    }
  }

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
 