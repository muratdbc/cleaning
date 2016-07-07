angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {
})
.controller('LoginCtrl', function($scope,DataApi,UserService,$state) {

    $scope.data = {};
    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        var userInfo={
          "email":$scope.data.username,
          "password":$scope.data.password
        }

        var data_encoded=toQueryString( userInfo )
        DataApi.getUser().post(data_encoded).then(function(user){
          if(angular.isObject(user)){
            UserService.setAccesToken(user.accessToken)
            console.log(UserService.getAccesToken())
            $state.go("jobs")
          }

        })
    }
})
.controller('JobsCtrl',['$scope','UserService','DataApi',function($scope,UserService,DataApi) {
  $scope.getJobs=function(){
    DataApi.getJobs().then(function(jobs){
      console.log(jobs)

      $scope.jobs=_.filter(jobs,function(job){
         return job.jobDate>moment().format("YYYY-MM-DD") ;
      })
    })
  };
  $scope.getJobs()

}]);
