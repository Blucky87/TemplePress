angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.book', {
    url: '/bookinfo',
    views: {
      'tab2': {
        templateUrl: 'templates/book.html',
        controller: 'bookCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.locations', {
    url: '/page5',
    views: {
      'tab3': {
        templateUrl: 'templates/locations.html',
        controller: 'locationsCtrl'
      }
    }
  })

  .state('tabsController.camera', {
    url: '/page6',
    views: {
      'tab5': {
        templateUrl: 'templates/camera.html',
        controller: 'cameraCtrl'
      }
    }
  })

  .state('tabsController.historicalSite1', {
    url: '/HS1',
    views: {
      'tab3': {
        templateUrl: 'templates/historicalSite1.html',
        controller: 'historicalSite1Ctrl'
      }
    }
  })

  .state('tabsController.historicalSite2', {
    url: '/HS2',
    views: {
      'tab3': {
        templateUrl: 'templates/historicalSite2.html',
        controller: 'historicalSite2Ctrl'
      }
    }
  })

  .state('tabsController.historicalSiteN', {
    url: '/HSN',
    views: {
      'tab3': {
        templateUrl: 'templates/historicalSiteN.html',
        controller: 'historicalSiteNCtrl'
      }
    }
  })

  .state('tabsController.login', {
    url: '/page11',
    views: {
      'tab4': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController.signup', {
    url: '/page12',
    views: {
      'tab4': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('tabsController.routes', {
    url: '/routeD',
    views: {
      'tab1': {
        templateUrl: 'templates/routes.html',
        controller: 'routesCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page12')

  

});