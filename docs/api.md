## API

### `<provider store>`
The provider component is registered internally by ng-component-redux. It accepts one binding, and that is the Redux store ([docs for Redux createStore()](http://redux.js.org/docs/api/createStore.html)). Currently, this package does not support passing the store to each connected component, but it is planned for the 1.0.0 release.

#### Bindings
* `store` (*[Redux Store](http://redux.js.org/docs/api/Store.html)*): Your application's Redux store.

#### Example
```js
import { createStore } from 'ng-component-redux'

import appReducer from './reducer'

const rootComponent = {
  controller () {
    this.store = createStore(appReducer)
  },
  template: `
    <provider store="$ctrl.store">
      <app></app>
    </provider>
  `
}
```

### `connect([mapStateToBindings], [mapDispatchToBindings])`
Creates a component that connects to the Redux store. This function works by taking the component definition you pass it and creating a connected component with a special `bindings` property, which makes store properties available to you.

_This function does not share the same API footprint as the react-redux `connect` function because it is not currently clear how `mergeBindings` and `options` would translate to Angular components._ If a path becomes clear to implementing these argument, they will be added before 1.0.0.

#### Arguments
* [`mapStateToBindings(state, {self}): stateBindings`] \(*Function*): If specified, the component will receive state slices from the Redux store. Anytime a value changes that your component is subscribed to, the `$onChanges` method in your component will be triggered, and the new value will automatically be bound to your controller.

** Although the hook is called `$onChanges`, it could be more accurately described as `$afterChanges` since by the time your code executes in `$onChanges`, the values are already mapped to the controller.

* [`mapDispatchToBindings(dispatch, {self}): dispatchBindings`] \(*Object* or *Function*): If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped in a `dispatch` call so they may be invoked directly, will be merged into the component’s `bindings` property. If a function is passed, it will be given `dispatch` as an argument for you to use however you wish, and it must return an object with your bound action creators. You may want to use the [`bindActionCreators()`](http://reactjs.github.io/redux/docs/api/bindActionCreators.html) helper from Redux if you choose to write a custom handler.

If you omit this argument altogether, the `dispatch` method will be added to your component’s `bindings` property. If `self` is specified as a second argument, its value will be the bindings passed from your component's parent..

#### Returns
An Angular component configuration object that injects state and action creators into your component an exposes them via a `bindings` property on the controller.

#### Note
* `mapStateToBindings` takes your store’s state as an argument and returns an object whose properties will be added to your component as bindings. Use [reselect](https://github.com/reactjs/reselect) or [Ramda lenses](http://ramdajs.com/docs/#lens) to efficiently compose selectors and [compute derived data](http://redux.js.org/docs/recipes/ComputingDerivedData.html).

#### Examples
** Many of these examples are identical to the examples given at the [react-redux](https://github.com/reactjs/react-redux) repo. They have been added here as well for convenience, and to demonstrate the similarities between the APIs of the two packages.

##### Inject just `dispatch` and don't listen to store
```js
import { childAction } from '../actions'

const exampleComponent = {
  bindings: {
    parentData: '<'
  },
  controller () {
    this.childAction = () => this.bindings.dispatch(childAction())
  }
  template: `
    <child-display-component
      action="$ctrl.childAction()"
      parent-data="$ctrl.bindings.parentData"
    ></child-display-component>
  `
}

export default connect()(exampleComponent)
```

##### Inject all action creators from a file without subscribing to any state

```js
import * as actions from '../actions'

export default connect(null, actions)(exampleComponent)
```

##### Inject `dispatch` and the entire application state
> This will cause an unnecessary number of digest iterations because every time anything in the store changes, the new value will be bound into the component even if the component never uses it. Since Angular has no way of determining whether or not it should fire a digest cycle, it does. Be sure to only bind the pieces of state you need to a component. It would be better to make every component a connected component with only the relevant pieces of state mapped to it than to do this.

```js
export default connect(state => state)(exampleComponent)
```

##### Inject `dispatch` and `todos` from the state

```js
function mapStateToBindings(state) {
  return { todos: state.todos }
}

export default connect(mapStateToBindings)(todoApp)
```

##### Inject `todos` and all action creators

```js
import * as actions from './actions'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

export default connect(mapStateToBindings, actions)(todoApp)
```

##### Inject `todos` and all action creators (`addTodo`, `completeTodo`, ...) as `actions`

```js
import * as actions from './actions'
import { bindActionCreators } from 'redux'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mapDispatchToBindings(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToBindings, mapDispatchToBindings)(todoApp)
```

#####  Inject `todos` and a specific action creator (`addTodo`)

```js
import { addTodo } from './actions'
import { bindActionCreators } from 'redux'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mapDispatchToBindings(dispatch) {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToBindings, mapDispatchToBindings)(todoApp)
```

##### Inject `todos`, todoActionCreators as `todoActions`, and counterActionCreators as `counterActions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mapDispatchToBindings(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}

export default connect(mapStateToBindings, mapDispatchToBindings)(todoApp)
```

##### Inject `todos`, and todoActionCreators and counterActionCreators together as `actions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mapDispatchToBindings(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
  }
}

export default connect(mapStateToBindings, mapDispatchToBindings)(todoApp)
```

##### Inject `todos`, and all todoActionCreators and counterActionCreators directly as props

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mapDispatchToBindings(dispatch) {
  return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
}

export default connect(mapStateToBindings, mapDispatchToBindings)(todoApp)
```

##### Inject `todos` of a specific user depending on props

```js
import * as actions from './actions'

function mapStateToBindings(state, ownBindings) {
  return { todos: state.todos[ownBindings.userId] }
}

export default connect(mapStateToBindings)(todoApp)
```

##### Inject `todos` of a specific user depending on props, and inject `props.userId` into the action

```js
import * as actions from './actions'

function mapStateToBindings(state) {
  return { todos: state.todos }
}

function mergeBindings(stateBindings, dispatchBindings, ownBindings) {
  return Object.assign({}, ownBindings, {
    todos: stateBindings.todos[ownBindings.userId],
    addTodo: (text) => dispatchBindings.addTodo(ownBindings.userId, text)
  })
}

export default connect(mapStateToBindings, actions, mergeBindings)(todoApp)
```

In all of these examples, the mapped `state` and `dispatch` are available on the bindings property of your component.

### `injector([ngDependency])`

#### Arguments
* [`ngDependency: mixed`] \(String): Gets a dependency out of Angular's DI container. This is useful in places such as middlewares, where you may need to react to some sort of Angular event such as a UI Router state change, perhaps.

This function is not limited to use inside of this application, but it is not considered best practice to get Angular dependencies this way, so use the helper sparingly, if ever, outside of middleware. Reducers should always remain pure, and without side effects, so do not use this helper inside of a reducer.

#### Returns
The dependency that was requested from the Angular DI container.

#### Example
```js
import { injector } from 'ng-component-redux'

export default function exampleMiddleware () {
  return store => next => action => {
    const $state = injector('$state')

    // ... Do whatever you need to do with your ng dependency ...

    return next(action)
  }
}
```
