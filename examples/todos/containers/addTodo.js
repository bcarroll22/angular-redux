import angular from 'angular'
import { connect } from 'ng-component-redux'

import { addTodo } from '../actions'

const addTodoComponent = {
  name: 'addTodo',
  controller () {
    this.submitTodo = () => this.bindings.dispatch(addTodo(this.todo))
  },
  template: `
    <div>
      <form novalidate>
        <input type="text" ng-model="$ctrl.todo"/>
        <button type="submit" ng-click="$ctrl.submitTodo()">
          Add Todo
        </button>
      </form>
    </div>
  `
}

const connectedAddTodoComponent = connect()(addTodoComponent)

const module = angular.module('AddTodo', [])
  .component('addTodo', connectedAddTodoComponent)

export default module.name
