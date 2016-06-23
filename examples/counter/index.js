import angular, { bootstrap } from 'angular'
import { createStore } from 'redux'

import counter from './reducers'
import Counter from './components/counter'

const store = createStore(counter)
const rootEl = document.getElementById('root')

const app = angular
  .module('counter', [Counter])
  .run(($rootScope) => {
    const assignToScope = () => {
      $rootScope.value = store.getState()
      $rootScope.onDecrement = () => store.dispatch({ type: 'DECREMENT' })
      $rootScope.onIncrement = () => store.dispatch({ type: 'INCREMENT' })
    }

    assignToScope()

    store.subscribe(assignToScope)
  })

bootstrap(rootEl, [app.name])
