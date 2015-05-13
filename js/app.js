var app = angular.module('myApp', ['ui.router', 'cn.offCanvas','angular.filter','satellizer','ui.bootstrap','firebase']);



app.run(['$rootScope','$state',function($rootScope, $state){
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("login");
        }
    });
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider',function($stateProvider, $urlRouterProvider, $authProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        	url: '/home',
        	controller: 'homeController',
        	controllerAs: 'hctrl',
        	templateUrl: 'partials/partial-home.html'

        })        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('details', {
            url: '/details',
            controller: 'detailController',
        	controllerAs: 'dtlctrl',
        	templateUrl: 'partials/partial-details.html',
        	resolve:{
        		'currentAuth':['MyAuth',function(MyAuth){
        			return MyAuth.$requireAuth();
        		}]
        	}
        })
        .state('login',{
        	url:'/login',
        	controller: 'ModalLoginController',
        	templateUrl: 'partials/partial-modal-login.html',
        	resolve:{
        		'currentAuth':['MyAuth',function(MyAuth){
        			return MyAuth.$waitForAuth();
        		}]
        	}
        })
        .state('events',{
            url:'/events',
            controller: 'eventsController',
            controllerAs: 'evntCtrl',
            templateUrl: 'partials/partial-events.html',
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$requireAuth();
                }]
            }
        }).state('event',{
            url:'/event?eventId',
            controller:'eventDetailController',
            controllerAs:'evntdtlCtrl',
            templateUrl:'partials/partial-details.html' // lain kali mending yang detailscontroller diilangin aja
        });

    $authProvider.facebook({
    	clientId: '1380551305608706'
    });
        
}]);



app.factory('offCanvas', function(cnOffCanvas) {
	return cnOffCanvas({
		controller: 'navCtrl',
		controllerAs: 'nav',
		templateUrl: 'partials/partial-offcanvas.html'
	})
}).factory('MyAuth',['$firebaseAuth',function($firebaseAuth){
    var ref = new Firebase('https://kibar.firebaseio.com');
    return $firebaseAuth(ref);
}]).factory('MyEvents',['$firebaseArray',function($firebaseArray){
    var ref = new Firebase('https://kibar.firebaseio.com');
    return $firebaseArray(ref.child('events'));
}]);

app.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});
