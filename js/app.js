var app = angular.module('myApp', ['ui.router', 'cn.offCanvas','angular.filter','satellizer','ui.bootstrap','firebase','ncy-angular-breadcrumb','ngFileUpload','cloudinary','ngResource']);



app.run(['$rootScope','$state','$modal',function($rootScope, $state,$modal){
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("login");
            $modal.open({
                animation: true,
                templateUrl: 'views/login.modal.html',
                controller: 'ModalLoginController',
                size:'sm'
            });
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
        	templateUrl: 'views/home.html'

        })
        // Tambahin state details dan channel juga
        .state('events',{
            url:'/events',
            controller:'eventsController',
            controllerAs: 'ectrl',
            templateUrl:'views/events.html'
        })
        .state('event',{
            url:'/event/:eventId',
            controller:'eventController',
            controllerAs:'evdctrl',
            templateUrl:'views/event.html' // lain kali mending yang detailscontroller diilangin aja
        })
        .state('dashboard',{
            url:'/dashboard',
            controller: 'dashboardController',
            controllerAs: 'dctrl',
            templateUrl: 'views/dashboard.html',
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$requireAuth();
                }]
            },
            ncyBreadcrumb: {
                label: 'Dashboard'
            }
        })
        .state('dashboard.organization',{
            url:'/organization',
            controller: 'dashboardOrganizationController',
            controllerAs: 'doctrl',
            templateUrl: 'views/dashboard.organization.html',
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$requireAuth();
                }]
            },
            ncyBreadcrumb: {
                label: 'Organization Settings'
            }
        })
        .state('dashboard.events',{
            url:'/events',
            controller: 'dashboardEventsController',
            controllerAs: 'dectrl',
            templateUrl: 'views/dashboard.events.html',
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$requireAuth();
                }]
            },
            ncyBreadcrumb: {
                label: 'Events'
            }
        })
        .state('dashboard.detail',{
            url:'/events/detail/:eventId',
            controller:'eventManageController',
            controllerAs:'emdctrl',
            templateUrl:'views/dashboard.events.manage.html' // lain kali mending yang detailscontroller diilangin aja
        })
        .state('login',{
            url:'/login',
            controller: 'loginController',
            controllerAs: 'lctrl',
            templateUrl: 'views/login.html', 
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$waitForAuth();
                }]
            }
        })
        .state('about',{
            url:'/about',
            templateUrl: 'views/about.html', 
        });
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        /*
        .state('details', {
            url: '/details',
            controller: 'detailController',
        	controllerAs: 'dtlctrl',
        	templateUrl: 'views/partial-details.html',
        	resolve:{
        		'currentAuth':['MyAuth',function(MyAuth){
        			return MyAuth.$requireAuth();
        		}]
        	}
        });
        
        
        // Jangn lupa hilangin titik koma diatas kalau mau restore
        .state('events',{
            url:'/events',
            controller: 'eventsController',
            controllerAs: 'evntCtrl',
            templateUrl: 'views/partial-events.html',
            resolve:{
                'currentAuth':['MyAuth',function(MyAuth){
                    return MyAuth.$requireAuth();
                }]
            }
        })
        
        .state('event',{
            url:'/event?eventId',
            controller:'eventDetailController',
            controllerAs:'evntdtlCtrl',
            templateUrl:'views/partial-details.html' // lain kali mending yang detailscontroller diilangin aja
        });
        */
    $authProvider.facebook({
    	clientId: '1380551305608706'
    });
        
}]);



app.factory('offCanvas', function(cnOffCanvas) {
	return cnOffCanvas({
		controller: 'navCtrl',
		controllerAs: 'nav',
		templateUrl: 'views/partial-offcanvas.html'
	})
}).factory('MyAuth',['$firebaseAuth',function($firebaseAuth){
    var ref = new Firebase('https://kibar.firebaseio.com');
    return $firebaseAuth(ref);
}]).factory('MyEvents',['$firebaseArray',function($firebaseArray){
    var ref = new Firebase('https://kibar.firebaseio.com');
    return $firebaseArray(ref.child('events'));
}]).factory('MyUsers', ['$firebaseArray', function($firebaseArray){
    var ref = new Firebase('https://kibar.firebaseio.com');
    return $firebaseArray(ref.child('users'));
}]).factory('MyAlbums', ['$rootScope','$resource', function($rootScope,$resource){
    var url = $.cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
}]).factory('TheEvent', ['$firebaseObject', function($firebaseObject){
    return function TheEvent(idEvent){
        var ref = new Firebase('https://kibar.firebaseio.com');
        return $firebaseObject(ref.child('events').child(idEvent));
    };
}]);

app.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});
