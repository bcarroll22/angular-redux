import angular from 'angular'

const counterComponent = {
  bindings: {
    onIncrement: '<',
    onDecrement: '<',
    value: '<'
  },
  controller: class CounterController {
    constructor ($timeout) {
      this.$timeout = $timeout
    }
    incrementIfOdd () {
      if (this.value % 2 !== 0) {
        this.onIncrement()
      }
    }

    incrementAsync () {
      this.$timeout(this.onIncrement, 1000)
    }
  },
  template: `
    <p>
      Clicked: {{ $ctrl.value }} times
      <button ng-click="$ctrl.onIncrement()">+</button>
      <button ng-click="$ctrl.onDecrement()">-</button>
      <button ng-click="$ctrl.incrementIfOdd()">Increment if odd</button>
      <button ng-click="$ctrl.incrementAsync()">Increment async</button>
    </p>
  `
}

export default angular.module('counterComponent', [])
  .component('counter', counterComponent)
  .name
