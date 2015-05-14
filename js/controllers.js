'use strict';

app.controller('sideController', ['$scope','$location','MyAuth','$modal', function($scope,$location,MyAuth,$modal){
	$scope.testhello = "test lagi";
	$scope.isCollapsed = true;

	MyAuth.$onAuth(function(authData){
		$scope.authData = authData;
	});
	
	$scope.openLoginModal = function(){
		$modal.open({
			animation: true,
      		templateUrl: 'views/login.modal.html',
      		controller: 'ModalLoginController',
      		size:'sm'
		});
	};

	$scope.logout =function(){
		MyAuth.$unauth();
		$location.path('/home');
	};


	// IsActiveMenu
	$scope.isActive = function(path){
		return path === $location.path();
	};


	
}])
.controller('homeController',['$scope','MyAuth',function($scope,MyAuth) {
	
	$scope.events = [
	/*
		{
			name:'Olimpiade kimia',
			location: 'itb',
			poster: 'img/posteroktan.jpg',
			logo: 'img/logoamisca.jpg',
			time: '28 agustus 2014',
			description: 'Oktan adalah olimpiade kimia tingkat nasional yang diselenggarakan oleh himpunan mahasiswa kimia "amisca" '
		}
		*/
	];

	MyAuth.$onAuth(function(authData){
		$scope.authData = authData;
	});
	


	$scope.testaja = 'halo';
	$scope.tesfungsi = function(){
		alert('helloworld');
	};
}])
.controller('loginController', ['$scope','$location','MyAuth', function($scope,$location,MyAuth){
	$scope.hello = "world";

	// Login 
	$scope.login = function(email, pass) {
		$scope.err = null;
		MyAuth.$authWithPassword({ email: email, password: pass }, {rememberMe: false})
		.then(function(/* user */) {
			$location.path('/events');
		}, function(err) {
			$scope.error = errMessage(err);
		});
	};

	// Register
	$scope.createUser = function(){
		$scope.message = null;
		$scope.error = null;

		MyAuth.$createUser({
			email: $scope.email,
			password: $scope.password
		}).then(function() {
			return MyAuth.$authWithPassword({ email: email, password: pass });
		}).then(function(userData) {
			$scope.message = "User created with uid: " + userData.uid;
		}).catch(function(error) {
			$scope.error = error;
		});
	}

	// ErrorMessagetampilan
	function errMessage(err) {
		return angular.isObject(err) && err.code? err.code : err + '';
	}


}])
.controller('eventsController', ['$scope',function($scope){
	$scope.hai = "events controller";
}])
.controller('dashboardController', ['$scope','$location', function($scope,$location){
	$scope.salam = "ini dari dashboard";

	// IsActiveMenu
	$scope.isActive = function(path){
		return path === $location.path();
	};

}])
.controller('dashboardOrganizationController', ['$scope', function($scope){
	$scope.hello = "world";
}])
.controller('dashboardEventsController', ['$scope','MyEvents','$modal', function($scope,MyEvents,$modal){
	$scope.hello = "wirld";


	// populate array
	$scope.events = MyEvents;
	
	$scope.openModal = function(){
		$modal.open({
			animation: true,
      		templateUrl: 'views/dashboard.events.modal.html',
      		controller: 'ModalEventController',
      		size:'lg'
		});
	};

	$scope.deleteEvent = function(event){
		console.log('test');
		MyEvents.$remove(event);
	};

}])

/*
.controller('navCtrl', function(offCanvas,$scope, $auth) {
	this.toggle = offCanvas.toggle;
	this.name="test dong";

	this.authenticate = function(provider){
		console.log("authenticating for "+provider);
		$auth.authenticate(provider);
	};

}).controller('detailController', ['currentAuth',function(currentAuth){
	this.eventname="Hearing calon ketua OSKM ITB 2015";



}]).controller('OffCanvasCtrl',function($scope,$modal){
	
	
})*/
.controller('ModalEventController', ['$scope','MyEvents','$modalInstance','$filter', function($scope,MyEvents,$modalInstance,$filter){
	// konfigurasi untuk date picker
	$scope.minDate = new Date();
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};


	// open popup picker
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.addEvent = function(){
		MyEvents.$add({
			name:$scope.event.name,
			date:$filter('date')($scope.event.date,'dd-MM-yyyy'),
			location:$scope.event.location,
			description:$scope.event.description
		});
	}

	$scope.closeModal = function(){
		$modalInstance.close();	
	}
}])
.controller('eventManageController', ['$scope','$stateParams', function($scope,$stateParams){
	$scope.hello = $stateParams;
}])
.controller('ModalLoginController',['$scope','MyAuth','$location','$modal','$modalInstance','MyUsers',function($scope,MyAuth,$location,$modal,$modalInstance,MyUsers){

	$scope.email ="fawwazmuhammad@gmail.com";
	$scope.password = "password";
	// CREATE USER DIPINDAHKAN
	$scope.login = function(email, pass) {
		$scope.err = null;
		MyAuth.$authWithPassword({ email: email, password: pass }, {rememberMe: false})
		.then(function(/* user */) {
			$location.path('/events');
			$modalInstance.close();
		}, function(err) {
			$scope.error = errMessage(err);
		});
	};

	// Register
	$scope.createUser = function(registeredAs){
		$scope.message = null;
		$scope.error = null;

		MyAuth.$createUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(userData) {
			// tamahin ke profile
			MyUsers.$add({uid: userData.uid, role: registeredAs});
			$scope.message = "User created with uid: " + userData.uid;
		}).then(function(){
			MyAuth.$authWithPassword({ email: $scope.email, password: $scope.password }, {rememberMe: false})
		}).then(function(/* user */) {
				$location.path('/events');
				$modalInstance.close();
			}, function(err) {
				$scope.error = errMessage(err);
		}).catch(function(error) {
			$scope.error = errMessage(error);
		});
	}

	// ErrorMessagetampilan
	function errMessage(err) {
		return angular.isObject(err) && err.code? err.code : err + '';
	}
	

}])
/*
.controller('eventsController',['$scope','MyEvents','currentAuth','MyAuth','$location',function($scope,MyEvents,currentAuth,MyAuth,$location,$modal,$modalInstance){
	$scope.helo = 'world';
	$scope.events = MyEvents;
	$scope.event={'name':'name1','location':'location1','date':'tes'}
	$scope.cauth= currentAuth;

	$scope.addEvent = function(event){
		MyEvents.$add(event);
	}

	$scope.removeEvent = function(event){
		MyEvents.$remove(event);
	}

	$scope.logout = function(){
		//alert("Test");
		MyAuth.$unauth();
		$location.path('/home');
	}

}])
*/
.controller('eventDetailController',['$scope','$stateParams',function($scope,$stateParams){
	$scope.hello = "world";
	$scope.state = $stateParams.eventId;
}]);