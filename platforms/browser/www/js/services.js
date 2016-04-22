angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.service('WPMap', [function(){

}])
.value('location',{ "name": "",
                    "location": {
                      "address": "",
                      "latitude": "0.0",
                      "longitude": "0.0"
                    },

                    "background": {
                      "construction": {
                        "completed": "",
                        "demolished": "",
                        "architect": ""
                      },

                      "story": "",
                      "notes": ""
                      },
                    
                    "meta": {
                      "imgID": "",
                      "GUID": ""
                    }})

.factory('locationData', [function(){
  var location = {};

  function setlocation(loc){
    location = loc;
  }
  
}])
.value('wp', wp = [])

.factory('genMap',['GeoLocationJSON',function(GeoLocationJSON){
  var map = {
    gMap : null,
    waypoints : [],
    origin: null,
    markers: [],
    infoWindows: [],
    setMap : function(targetElement){
      var currentLocation = GeoLocationJSON.getCurrentGeoLocation().then(
        function(postion){
          var temp = new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude);
          var mapOptions = {
            streetViewControl: true,
            center: temp,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.TERRAIN
            
          };
          map.gMap = new google.maps.Map(targetElement, mapOptions);

        }, function(err){

        });

      return map;
    },

    addWayPoint : function(locations) {
      console.log(locations);
      for(var i=0; i<locations.length; i++){
        
        map.waypoints.push(locations[i]);
      }
      return map;
    },

    buildMarkers : function(){
      for(var i=0; i< map.waypoints.length; i++){
        console.log(map.waypoints[i]);
        var tempPos = new google.maps.LatLng(map.waypoints[i].location.latitude, map.waypoints[i].location.longitude);
        var tempMarker = new google.maps.Marker({
          position: tempPos,
          map: map.gMap,
          title: map.waypoints[i].name
        });

        var tempWindow = new google.maps.InfoWindow({
             content: map.waypoints[i].name
        });

        tempWindow.open(map.gMap, tempMarker);
        map.markers.push(tempMarker);
        map.infoWindows.push(tempWindow);
      }

      return map;
    }
  };

  return map;
}])

.factory('IsAvailable', ['$http', 'data', function($http, data){
  var status = false;
  var obj = {};
  
  $http.post('otiose.io/php/IsAvailable.php', data).then(function(response){
    if(reponse.data === "true")
      status = true;
  }, function(response){
    //onFail
  });

  return status;

}])


.factory('GeoLocationJSON',['$q', function($q){
  return {

    getCurrentGeoLocation: function(options) {
      var q = $q.defer();
      navigator.geolocation.getCurrentPosition(function(result){
        console.log("yes: " + result);
        q.resolve(result);

      }, function(err) {
        console.log(err);
        q.reject(err);
      }, options);

      return q.promise;
    }

  }
}])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        console.log("Images saved to:" + result)
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.service('BlankService', [function(){

}]);

