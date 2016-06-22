const ProviderComponent = {
  bindings: {
    store: '<'
  },
  controller: class ProviderController {
    set store (store) {
      Object.assign(this, store)
    }
  },
  template: '<ng-transclude></ng-transclude>',
  transclude: true
}

export default ProviderComponent
