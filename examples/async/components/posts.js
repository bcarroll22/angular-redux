import angular from 'angular'

const postsComponent = {
  bindings: {
    posts: '<'
  },
  template: `
    <ul>
      <li ng-repeat="post in $ctrl.posts track by $index" key="{{ ::$index }}">
        {{ ::post.title }}
      </li>
    </ul>
  `
}

export default angular.module('posts', [])
  .component('posts', postsComponent)
  .name
