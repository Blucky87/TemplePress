angular.module('app.controllers', ['uiGmapgoogle-maps'])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCBs4S7LnhoinGQihtot34nDEdlJnTZT1c',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
})
  
.controller('bookCtrl', function($scope, $http, GeoLocationJSON, uiGmapGoogleMapApi ) {
  

  $scope.testPHP = function(){


  }


})


.controller('locationdebugCtrl', function($scope, $ionicLoading, GeoLocationJSON) {

  $scope.updateLocation = function() {
    GeoLocationJSON.getCurrentGeoLocation().then(
      function(position){
        console.log(position);
        $scope.location = position;
      },function(err){

      });
  }



    $scope.init = function initialize(long, lat){
      $('.jj').hide();
      $('p').hide();

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

.controller('locationsCtrl', function($scope, account, $http, location, locationList, routeList, uiGmapGoogleMapApi, GeoLocationJSON, updated, $state) {
  $scope.models = [];
  $scope.updated = false;
  var url = "";
  var selectedLocation = {};
  $scope.locations = locationList;

  $scope.doRefresh = function(){
    if(account.loggedin === 'true' && updated == false){
      for(var i=5; i<10; i++){
        $http.get(url+'assets/locationJSON/e'+i+'.json').then(function(response){
          locationList.push(response.data);
         
        }, function(err){

        });
      }

      for(var i=4; i<9; i++){
        $http.get(url+'assets/locationJSON/d'+i+'.json').then(function(response){
          locationList.push(response.data);
         
        }, function(err){
          
        });
      }
      updated = true;
      $state.reload();
    }else{
      $scope.$broadcast('scroll.refreshComplete');
      return;
    }
  }

  $scope.selectItem = function(index){

    location.name = locationList[index].name;
    location.location.address = locationList[index].location.address;
    location.location.latitude = locationList[index].location.latitude;
    location.location.longitude = locationList[index].location.longitude;
    location.background.construction.completed = locationList[index].background.construction.completed;
    location.background.construction.demolished = locationList[index].background.construction.demolished;
    location.background.construction.architect = locationList[index].background.construction.architect;
    location.background.story = locationList[index].background.story;
    location.background.notes = locationList[index].background.notes;
    location.meta.imgID = locationList[index].meta.imgID;
    location.meta.GUID = locationList[index].meta.GUID;
    
  };

  $scope.selectMarker = function(index){

    $scope.selectItem(index);
    $state.go('tabsController.historicalSiteN');
     console.log(location);
  };



  $scope.center = function(){
    GeoLocationJSON.getCurrentGeoLocation().then(function(result){
      console.log(result);
      $scope.map.center = {latitude: result.coords.latitude, longitude: result.coords.longitude};
      $scope.map.zoom = 13;
    }, function(err){
      console.log(err);
    });
  };

  $scope.map = {
    center: {latitude: 39.952247, longitude: -75.163894},
    zoom: 14,
    bounds: {}
  };

  $scope.options = {
    
  };

  $scope.$on('$ionicView.loaded', function(){

    if(locationList.length == 0) {
      for(var i=0; i<5; i++){
        $http.get(url+'assets/locationJSON/e'+i+'.json').then(function(response){
          locationList.push(response.data);
         
        }, function(err){

        });
      }

      for(var i=0; i<4; i++){
        $http.get(url+'assets/locationJSON/d'+i+'.json').then(function(response){
          locationList.push(response.data);
         
        }, function(err){
          
        });
      }
    }

  });

})

.controller('accntCtrl', function($scope, account) {
  $scope.account = account;
})

.controller('cameraCtrl', function($scope) {

})
   
.controller('historicalSite1Ctrl', function($scope) {

})
.controller('tabsCtrl', function($scope, account, $state) {
  $scope.accountcheck = function(){
    if(account.loggedin === "true"){
      console.log("rerouting");
      $state.transitionTo("tabsController.account");
    }
  }
})
   
.controller('historicalSiteNCtrl', function($scope, location, routeList, $state, wp) {
  $scope.selectedItem = location;
  $scope.addtoroute = function(){
    routeList.push($scope.selectedItem);
    console.log($('#lat').text());
    wp.push({latitude: $('#lat').text(), longitude: $('#long').text() });
    $state.reload('tabsController.routes');
  };
  console.log(wp);
})
   
.controller('loginCtrl', function($scope, $http, account, $state) {
  $scope.messagelog = [];

  $scope.inputForm = {
    email: "",    
    password: "",
  }

  $scope.submittal = function(event){
    $scope.Message = "";
    $scope.messagelog = [];
    var $btn = $(event.currentTarget);

    if($scope.inputForm.email === "" ||  $scope.inputForm.password === ""){
      $scope.messagelog.push("Please enter your registered email and password.");
      return;
    }

    $http.post('http://www.otiose.io/templepress/login.php', JSON.stringify($scope.inputForm)).then(function(response){
      if(response.data.name){
        account.loggedin = "true";
        account.email = response.data["email"];
        account.password = response.data["password"];
        account.name = response.data["name"];
        account.rdate = response.data["rdate"];
        $state.go("tabsController.account");
        $scope.inputForm.email = "";
        $scope.inputForm.password = "";

        console.log(account);
      }

    }, function(response){
      $scope.messagelog.push("failed to communicate with external server");
    }); 

  }

})
   
.controller('signupCtrl', function($scope, $http, $ionicHistory) {
  $scope.messagelog = [];

  $scope.inputForm = {
    name: "",
    email: "",    
    password: "",
    rpassword: ""
  }

  $scope.submittal = function(event){
    $scope.Message = "";
    $scope.messagelog = [];
    var $btn = $(event.currentTarget);

    if($scope.inputForm.password != $scope.inputForm.rpassword || $scope.inputForm.password == ""){
      $scope.passconfirm = "failed";
      $scope.messagelog.push("invalid password");
      return;
    }

    $http.post('http://www.otiose.io/templepress/register.php', JSON.stringify($scope.inputForm)).then(function(response){
      if(response.data === "true"){
        $ionicHistory.goBack();
      } else if(response.data === "false"){
        $scope.messagelog.push("email already in use");
        $scope.emailconfirm = "failed";
      } else {
        $scope.messagelog.push("external server having is having internal errors");
      }
    }, function(response){
     $scope.messagelog.push("failed to communicate with external server");
    });    

  }

})
   
.controller('routesCtrl', function($scope, routeList, wp) {
  $scope.location = "temple university";
  $scope.wpcal = function(){
    var temp = [];
    for(var i=0; i<routeList.length-1; i++){
      temp.push(new google.maps.LatLng(routeList[i].location.latitude, routeList[i].location.longitude))
    }

    return temp;
  }

  $scope.$on('$ionicView.loaded', function(){
     navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.location = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log($scope.location);
        console.log($scope.end);
      });
   });

  $scope.routelist = routeList;

  // map object
  $scope.mapOptions = {
    control: {},
    center: {
        latitude: -37.812150,
        longitude: 144.971008
    },
    zoom: 14
  };
  
  // marker object
  $scope.marker = {
    center: {
        latitude: -37.812150,
        longitude: 144.971008
    }
  }
  
  // instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  
  
  // directions object -- with defaults
  $scope.directions = {
    origin: $scope.location,
    //waypoints: $scope.wpcal,
    destination: $scope.end,
    showList: false
  }
  
  // get directions using google maps api
  $scope.getDirections = function () {
    $scope.tempwp = [];
    for(var i=0; i<routeList.length; i++){
      $scope.tempwp.push(new google.maps.LatLng(routeList[i].location.latitude, routeList[i].location.longitude))
      console.log("lat: " + routeList[i].location.latitude);
      console.log("long: " + routeList[i].location.longitude);
      console.log(routeList);

    }

    $scope.end = new google.maps.LatLng(routeList[routeList.length-1].location.latitude, routeList[routeList.length-1].location.longitude);
    console.log("sdfsd");
    console.log($scope.tempwp);
    console.log($scope.directions.origin);
    var request = {
      origin: $scope.directions.origin,
      waypoints: wp,
      destination: $scope.end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    console.log(request);
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(document.getElementById('map'));
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
        alert('Google route unsuccesfull!');
      }
    });
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
 