var routerApp = angular.module('myApp', ['ui.router', 'cn.offCanvas','angular.filter']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
	
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
        	templateUrl: 'partials/partial-details.html'
        });
        
    });

routerApp.controller('homeController', function($scope,offCanvas) {
	this.toggle = offCanvas.toggle;
	$scope.events = [
		{
			name:'Olimpiade kimia',
			location: 'itb',
			poster: 'img/posteroktan.jpg',
			logo: 'img/logoamisca.jpg',
			time: '28 agustus 2014',
			description: 'Oktan adalah olimpiade kimia tingkat nasional'
		},
		{
			name:'Oprec OSKM',
			location: 'bandung',
			poster: 'img/posteroskm.jpg',
			logo: 'img/logooskm.jpg',
			time: '21 april 2014',
			description: 'Panitia OSKM membuka open recruitment untuk menyambut mahasiswa baru'
		},
		{
			name:'itb in move',
			location: 'itb',
			poster: 'img/posterinmove.jpg',
			logo: 'img/logokabinet.png',
			time: '28 agustus 2014',
			description: 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non'
		},
		{
			name:'Pasar Seni',
			location: 'bandung',
			poster: 'img/posterpasarseni.jpg',
			logo: 'img/logokmsr.jpg',
			time: '21 april 2014',
			description: 'lorem ipsum again'
		}
	];
}).controller('navCtrl', function(offCanvas) {
	this.toggle = offCanvas.toggle;
}).controller('detailController', function(offCanvas){
	this.eventname="Hearing calon ketua OSKM ITB 2015";
});

routerApp.factory('offCanvas', function(cnOffCanvas) {
	return cnOffCanvas({
		controller: 'navCtrl',
		controllerAs: 'nav',
		template: '<nav class="off-canvas__nav" ng-swipe-left="nav.toggle()">the nav</nav>'
	})
});

routerApp.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});
