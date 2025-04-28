angular.module('proPortal')
  .service('api', ['$http', function ($http) {
    const BASE = 'http://localhost:3000';
    this.evaluate = cand => $http.post(`${BASE}/evaluate`, cand);
  }]);
