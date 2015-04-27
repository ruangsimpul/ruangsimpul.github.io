var routerApp = angular.module('myApp', ['ui.router', 'cn.offCanvas','angular.filter','satellizer']);

routerApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {
	
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

    $authProvider.facebook({
    	clientId: '1380551305608706'
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
			description: 'Oktan adalah olimpiade kimia tingkat nasional yang diselenggarakan oleh himpunan mahasiswa kimia "amisca" '
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
			description: 'ITB inmove adalah gerakan mempertemukan para kreator sehingga bisa berkolaborasi.'
		},
		{
			name:'Pasar Seni',
			location: 'bandung',
			poster: 'img/posterpasarseni.jpg',
			logo: 'img/logokmsr.jpg',
			time: '21 april 2014',
			description: 'Pasar seni adalah event super langka yang diselenggarakan oleh KMSR(Keluarga Mahasiswa Seni Rupa). Temukan ...'
		},
		{
			name:'Pengumuman Penerima Beasiswa',
			location: 'bandung',
			poster: 'img/posterlpdp.png',
			logo: 'img/itb2.jpg',
			time: '13 maret 2014',
			description: 'Berikut adalah daftar penerima informasi beasiswa LPDP oleh Lembaga Kemahasiswaan'
		}
	];
}).controller('navCtrl', function(offCanvas,$scope, $auth) {
	this.toggle = offCanvas.toggle;
	this.name="test dong";

	this.authenticate = function(provider){
		console.log("authenticating for "+provider);
		$auth.authenticate(provider);
	};

}).controller('detailController', function(offCanvas){
	this.eventname="Hearing calon ketua OSKM ITB 2015";
});

routerApp.factory('offCanvas', function(cnOffCanvas) {
	return cnOffCanvas({
		controller: 'navCtrl',
		controllerAs: 'nav',
		templateUrl: 'partials/partial-offcanvas.html'
	})
});

routerApp.directive('holderFix', function () {
    return {
        link: function (scope, element, attrs) {
            Holder.run({ images: element[0], nocss: true });
        }
    };
});
