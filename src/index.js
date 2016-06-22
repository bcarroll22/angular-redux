import angular from 'angular'

import connect from './components/connect'
import getDevTools from './utils/devTools'
import Provider from './components/provider'
import injector from './utils/injectorHelper'

export { connect, getDevTools, injector }

const componentsModule = angular.module('angular-redux.connectedComponents', []).name

export default angular.module('angular-redux', [componentsModule])
  .component('provider', Provider)
  .name
