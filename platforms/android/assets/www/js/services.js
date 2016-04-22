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

.service('genMap',['GeoLocationJSON',function(GeoLocationJSON){
  var map = '';
  var waypoints = '';
  var currentLocation = GeoLocationJSON.getCurrentGeoLocation().then(
    function(postion){
      return new google.maps.LatLng(postion);
    }, function(err){

    });

  return {
    setMap : function(targetElement){
      var mapOptions = {
        streetViewControl:true,
        center: currentLocation,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      map = new google.maps.Map(targetElement,
            mapOptions);
      return this;
    };

    setWayPoints : function(locations) {
      waypoints = locations;
      return this;
    };



  }
  
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

