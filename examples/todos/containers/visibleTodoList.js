import angular from 'angular'
import { connect } from 'ng-component-redux'

import TodoList from '../components/todoList'
import { toggleTodo } from '../actions'

const visibleTodoList = {
  name: 'visibleTodoList',
  template: `
    <todo-list
      on-todo-click="$ctrl.bindings.onTodoClick"
      todos="$ctrl.bindings.todos"
    ></todo-list>
  `
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
  onTodoClick (id) {
    dispatch(toggleTodo(id))
  }
})

const connectedVisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(visibleTodoList)

const module = angular.module('VisibleTodoList', [TodoList])
  .component('visibleTodoList', connectedVisibleTodoList)

export default module.name
