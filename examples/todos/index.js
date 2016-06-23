import { createStore } from 'redux'
import angular, { bootstrap } from 'angular'
import AngularRedux from 'ng-component-redux'

import App from './components/app'
import todoApp from './reducers'

const app = angular
  .module('todos', [AngularRedux, App])
  .run($rootScope => ($rootScope.store = createStore(todoApp)))

bootstrap(document.getElementById('root'), [app.name])
