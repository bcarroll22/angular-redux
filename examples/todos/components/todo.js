import angular from 'angular'

const module = angular.module('Todo', [])
  .component('todo', {
    bindings: {
      item: '<',
      onClick: '<'
    },
    template: `
      <li
        ng-click="$ctrl.onClick($ctrl.item.id)"
        ng-style="$ctrl.item.completed && { 'text-decoration': 'line-through' }"
      >
        {{ $ctrl.item.text }}
      </li>
    `
  })

export default module.name
