## Usage

### Getting started
Although most resources available online are for usage with React, Redux is a framework-agnostic state mangement container. The package was made with the intention of leveling the playing field and making it easy to refer to React Redux resources when building a Redux application with Angular ^1.5.3.

To get started, run the following command in your project's directory:
```
npm i -S redux ng-component-redux
```
If for some reason you cannot use npm, you may use the [pre-built UMD module](https://unpkg.com/ng-component-redux@1.0.0-beta.3/dist/ng-component-redux.js), although this is not recommended for any more than experimentation.

### Presentational and container components
Much like react-redux, this package embraces the idea of smart components that connect to the Redux store, and dumb components that receive their actions and state as bindings (props in React). Dan Abramov, the creator of Redux, does a great job of explaining this concept [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). In a well-written application, most of your components should be display components, and often times they can be reusable. Any component that needs to be connected to the Redux store can be passed to the `connect()` function exposed by this package.

### Learn by example
To demonstrate the idea of presentational and container components, we will walk through the process of building a (very) simple todo list application with this package. The original example can be found [here](http://redux.js.org/docs/basics/UsageWithReact.html). Note the similarity in this package's API and the react-redux API. This will be a _huge_ help to you as you look for resources to help you in your journey toward Redux mastery.

#### Pass the store into the application
This is where you will bootstrap your angular application, as well as create the Redux store. The store must be given to the provider component which is registered by this package.

##### `index.js`
```javascript
import angular from 'angular'

import Root from './components/root'

const app = angular.module('todo-list-app', [Root])

angular.bootstrap(
  document.getElementById('root'),
  [app.name],
  { strictDi: true }
)
```

##### `components/root.js`
```javascript
import angular from 'angular'

import App from './app'
import AngularRedux, { createStore } from 'ng-component-redux'

import todoApp from './reducers'
import configureStore from 'app/configureStore'

const module = angular.module('Root', [AngularRedux, App])
  .component('root', {
    controller () {
      this.store = createStore(todoApp)
    },
    template: `
      <provider store="$ctrl.store">
        <app></app>
      </provider>
    `
  })

export default module.name
```

#### Presentational components
Note that no logic is defined in these components, nor is any state created. These components simply receive data, and call methods that have been passed down to them from parent components. This allows a very predictable, traceable flow through your application.

##### `components/todo.js`
```javascript
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
```

##### `components/todoList.js`
```javascript
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
```

##### `components/footer.js`
```javascript
import angular from 'angular'

import FilterLink from './filterLink'

const module = angular.module('Footer', [FilterLink])
  .component('footer', {
    template: `
      <p>
        Show:
        <filter-link filter="SHOW_ALL">
          All
        </filter-link>,
        <filter-link filter="SHOW_ACTIVE">
          Active
        </filter-link>,
        <filter-link filter="SHOW_COMPLETED">
          Completed
        </filter-link>
      </p>
    `
  })

export default module.name
```

##### `components/app.js`
```javascript
import angular from 'angular'

import Footer from './footer'
import AddTodo from './addTodo'
import VisibleTodoList from './visibleTodoList'

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
```

Interesting note, notice that the app component is not a container component. Although it is the entry point into our application, it isn't a necessary place to connect to our store, so we don't. It's up to you and your team to decide the right places to connect to the store, just make sure you don't connect in every container. Keep the number of container components smaller than presentational components!

### Container components
Container components have one job; connect your app to the store. Container components shouldn't be doing complex templating; that job should be delegated to presentational components. Each type of component has one job. Container components _get_ the data and actions, presentational components _use_ the data and actions.

Note that everything that is given to the component by the Redux store is available via the `bindings` object on the controller. If you are looking at a React Redux tutorial, you will see this referred to as `props`. Instead of using React terminology, this package prefers the Angular term bindings.

##### `components/filterLink.js`
```javascript
import angular from 'angular'
import { connect } from 'ng-component-redux'
import { setVisibilityFilter } from '../actions'

const filterLink = {
  name: 'filterLink',
  bindings: {
    filter: '@'
  },
  template: `
    <a href="#" ng-click="$ctrl.bindings.onClick()" ng-transclude></a>
  `,
  transclude: true
}

const mapStateToProps = (state, ownBindings) => ({
  active: ownBindings.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownBindings) => ({
  onClick () {
    dispatch(setVisibilityFilter(ownBindings.filter))
  }
})

const connectedFilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(filterLink)

const module = angular.module('FilterLink', [])
  .component('filterLink', connectedFilterLink)

export default module.name
```

##### `components/visibleTodoList.js`
```javascript
import angular from 'angular'
import { connect } from 'ng-component-redux'

import TodoList from './todoList'
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
```

### Other components
The `addTodo` component is a bit of a black sheep. It demonstrates the flexibility of the Redux. You don't *have* to explicitly bind actions or state to a container component. If nothing is specified, all that is given to your component is a `dispatch` method that will allow you to dispatch actions. Also, there is nothing strictly enforcing that container components cannot display a template. It's not recommended, but there's nothing stopping you from doing it.

You will find many differing opinions online about what "best" practices are for Redux architecture. The best practice for your team will be to use Redux, experiment, and learn what works best for your team. If you don't like the harsh line between container and presentational components, you may see more components that look like `addTodo`. _Just make sure your components are easy for you and your team to debug and reason about!_

##### `components/addTodo.js`
```javascript
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
```
