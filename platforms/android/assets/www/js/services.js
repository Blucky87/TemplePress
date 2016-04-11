angular.module('app.services', [])

.factory('BlankFactory', [function(){

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

