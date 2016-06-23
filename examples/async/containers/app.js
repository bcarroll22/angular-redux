import angular from 'angular'
import { connect } from 'ng-component-redux'

import Posts from '../components/posts'
import Picker from '../components/picker'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'

const app = {
  name: 'app',
  controller: class AppController {
    constructor () {
      this.handleChange = this.handleChange.bind(this)
    }

    $onInit () {
      const { dispatch, selectedReddit } = this.bindings
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    handleChange (nextReddit) {
      this.bindings.dispatch(selectReddit(nextReddit))
    }

    handleRefreshClick (e) {
      e.preventDefault()

      const { dispatch, selectedReddit } = this.bindings
      dispatch(invalidateReddit(selectedReddit))
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  },
  template: `
    <div>
      <picker
        value="$ctrl.bindings.selectedReddit"
        on-change="$ctrl.handleChange"
        options="['angularjs', 'frontend']"
      ></picker>
      <p>
        <span ng-if="$ctrl.bindings.lastUpdated">
          Last updated at {{ new Date($ctrl.bindings.lastUpdated).toLocaleTimeString() }}.
        </span>
        <a href="#" ng-if="!$ctrl.bindings.isFetching" ng-click="$ctrl.handleRefreshClick($event)">
          Refresh
        </a>
      </p>
      <div ng-if="$ctrl.bindings.isEmpty">
        <h2 ng-if="$ctrl.bindings.isFetching">Loading...</h2>
        <h2 ng-if="!$ctrl.bindings.isFetching">Empty.</h2>
      </div>
      <div ng-if="!$ctrl.isEmpty" ng-style="{ 'opacity': $ctrl.bindings.isFetching ? '0.5' : '1' }">
        <posts posts="$ctrl.bindings.posts"></posts>
      </div>
    </div>
  `
}

function mapStateToProps (state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

const connectedApp = connect(mapStateToProps)(app)

const module = angular.module('app', [Posts, Picker])
  .component('app', connectedApp)

export default module.name
