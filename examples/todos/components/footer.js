import angular from 'angular'

import FilterLink from '../containers/filterLink'

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
