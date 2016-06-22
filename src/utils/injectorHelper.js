import angular from 'angular'

const injector = dep => angular.element(document).injector().get(dep)

export default injector
