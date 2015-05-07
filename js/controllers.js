'use strict';

app.controller('homeController', function($scope,offCanvas,$modal) {
	this.toggle = offCanvas.toggle;
	$scope.events = [
	/*
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
		*/
	];


	


	$scope.testaja = 'halo';
	$scope.tesfungsi = function(){
		alert('helloworld');
	};
}).controller('navCtrl', function(offCanvas,$scope, $auth) {
	this.toggle = offCanvas.toggle;
	this.name="test dong";

	this.authenticate = function(provider){
		console.log("authenticating for "+provider);
		$auth.authenticate(provider);
	};

}).controller('detailController', ['currentAuth',function(currentAuth){
	this.eventname="Hearing calon ketua OSKM ITB 2015";



}]).controller('OffCanvasCtrl',function($scope,$modal){
	
	$scope.open = function () {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'partials/partial-modal-login.html',
			controller: 'ModalLoginController',
			size: 'sm',
		});

		modalInstance.result.then(function () {
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};
	
}).controller('ModalLoginController',['$scope','MyAuth','$location',function($scope,MyAuth,$location){

	// Register new user
	$scope.createUser = function(){
		$scope.message = null;
		$scope.error = null;

		MyAuth.$createUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(userData) {
			$scope.message = "User created with uid: " + userData.uid;
		}).catch(function(error) {
			$scope.error = error;
		});
	}



	$scope.email = 'fawwazmuhammad@gmail.com';
	$scope.password = 'password';

	$scope.login = function(email, pass) {
		$scope.err = null;
		Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: false})
		.then(function(/* user */) {
			$location.path('/details');
		}, function(err) {
			$scope.err = errMessage(err);
		});
	};

}]);