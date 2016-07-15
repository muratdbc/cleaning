


angular.module('starter.services', [])
.factory('UserService',['$localStorage',function($localStorage){
  return {
        setAccesToken: function(token){
          $localStorage.accesToken=token
        },
        getAccesToken: function(){
            return $localStorage.accesToken
        }
      }
}])
.factory('DataApi', ['Restangular','UserService',function(Restangular,UserService) {
  Restangular.setBaseUrl('https://api.stage.rentlever.com/');
  Restangular.setDefaultHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  return{
      getUser:function(){
        return Restangular.service('users/authenticate');
      },
      getJobs:function(){
        Restangular.setDefaultRequestParams({token: UserService.getAccesToken()});
        console.log(Restangular.all('maintenance-jobs'))
        return Restangular.all('maintenance-jobs').getList();
      }
    }
}]);
