angular.module('proPortal')
  .service('api', ['$http', function ($http) {
    const BASE = 'http://localhost:4000';
    this.evaluate = cand => $http.post(`${BASE}/evaluate`, cand);
  }]);
