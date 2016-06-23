import angular from 'angular'

const pickerComponent = {
  bindings: {
    value: '<',
    onChange: '<',
    options: '<'
  },
  template: `
    <span>
      <h1>{{ $ctrl.value }}</h1>
      <select
        ng-change="$ctrl.onChange($ctrl.value)"
        ng-model="$ctrl.value"
      >
        <option
          ng-repeat="option in $ctrl.options track by $index"
          value="{{ ::option }}"
          key="{{ ::option }}"
        >
          {{ ::option }}
        </option>
      </select>
    </span>
  `
}

export default angular.module('picker', [])
  .component('picker', pickerComponent)
  .name
