import angular, { bootstrap } from 'angular'
import AngularRedux from 'ng-component-redux'

import App from './containers/app'
import configureStore from './store/configureStore'

const store = configureStore()

const app = angular
  .module('async', [AngularRedux, App])
  .run($rootScope => ($rootScope.store = store))

bootstrap(document.getElementById('root'), [app.name])
