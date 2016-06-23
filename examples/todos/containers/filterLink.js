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
