import angular from 'angular'

import TodoListItem from './todo'

const module = angular.module('TodoList', [TodoListItem])
  .component('todoList', {
    bindings: {
      onTodoClick: '<',
      todos: '<'
    },
    template: `
      <todo
        item="todo"
        on-click="$ctrl.onTodoClick"
        ng-repeat="todo in $ctrl.todos track by todo.id"
      ></todo>
    `
  })

export default module.name
