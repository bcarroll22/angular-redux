import angular from 'angular'

import Footer from './footer'
import AddTodo from '../containers/addTodo'
import VisibleTodoList from '../containers/visibleTodoList'

const module = angular.module('app', [
  AddTodo,
  Footer,
  VisibleTodoList
])
  .component('app', {
    template: `
      <div>
        <add-todo></add-todo>
        <visible-todo-list></visible-todo-list>
        <footer></footer>
      </div>
    `
  })

export default module.name
