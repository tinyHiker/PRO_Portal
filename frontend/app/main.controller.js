angular.module('proPortal')
  .controller('MainCtrl', ['api', '$window', function (api, $window) {
    const vm = this;

    vm.boolOpts = [
      { label: '',   value: undefined },
      { label: 'Yes', value: true },
      { label: 'No',  value: false }
    ];

    vm.candidate = JSON.parse($window.localStorage.getItem('candidate') || '{}');
    vm.flags = [];

    vm.evaluate = () => {
      api.evaluate(vm.candidate).then(res => {
        vm.flags = res.data.flags;
        $window.localStorage.setItem('candidate', JSON.stringify(vm.candidate));
      });
    };
  }]);
