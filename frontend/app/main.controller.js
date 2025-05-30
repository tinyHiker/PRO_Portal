angular.module('proPortal')
  .controller('MainCtrl', ['api', '$window', function (api, $window) {
    const vm = this;

    vm.boolOpts = [
      { label: '', value: undefined },
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ];

    vm.candidate = JSON.parse($window.localStorage.getItem('candidate') || '{}');
    vm.flags = [];
    vm.success = false;

    vm.evaluate = function () {
      api.evaluate(vm.candidate)
        .then(function (res) {
          vm.flags = (res.data && res.data.flags) ? res.data.flags.map(f => ({ ...f, acknowledged: false })) : [];
          vm.success = vm.flags.length === 0;
          $window.localStorage.setItem('candidate', JSON.stringify(vm.candidate));
        })
        .catch(function (err) {
          console.error('API call failed:', err);
          vm.flags = [];
          vm.success = false;
        });
    };

    
    vm.overrideFlag = function () {
      
      vm.flags = vm.flags.filter(flag => !flag.acknowledged);
      vm.success = vm.flags.length === 0;
    };
  }]);
