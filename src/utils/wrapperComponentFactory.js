import invariant from 'invariant'

const createWrapperComponent = ({
  bindings,
  mapState,
  transclude,
  mapDispatch,
  shouldSubscribe,
  wrappedElementName,
  wrappedComponentName
}) => ({
  // Use the bindings from the passed component
  bindings,

  // Define the new controller that communicates with the store
  controller: class ConnectComponentController {
    /**
     * Run the logic that fires when this component initializes and has access to the store.
     */
    $onInit () {
      invariant(this.store,
        `"Store" is not available in "${wrappedComponentName}". Wrap your application's root ` +
        `component in a <provider>, or pass "store" as a binding to "${wrappedComponentName}.`
      )

      this.tryStateSubscribe()
      this.configureDispatchBindings()
    }

    /**
     * Handle the component's scope being destroyed.
     */
    $onDestroy () {
      this.tryUnsubscribe()
    }

    /**
     * Assign the dispatch bindings to this component.
     *
     * @param  {Object} state
     * @param  {Object} dispatch
     */
    configureDispatchBindings () {
      Object.assign(this, mapDispatch(this.store.dispatch, this))
    }

    /**
     * Handle a change to one of the bindings coming in to this component.
     */
    handleSubscribe () {
      if (!this.unsubscribe) return

      this.updateStateBindings()
    }

    /**
     * Try the subsciption to the store if it should subscribe.
     */
    tryStateSubscribe () {
      if (shouldSubscribe && !this.unsubscribe) {
        this.unsubscribe = this.store.subscribe(this.handleSubscribe.bind(this))
        this.handleSubscribe()
      }
    }

    /**
     * Try to unsubscibe when the component is being destroyed.
     */
    tryUnsubscribe () {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
    }

    /**
     * Assign the state bindings to this component.
     *
     * @param  {Object} state
     * @param  {Object} dispatch
     */
    updateStateBindings () {
      Object.assign(this, mapState(this.store.getState(), this))
    }
  },

  // Make the provider controller available to this component as `store`
  require: {
    store: '^^provider'
  },

  // This component needs a custom template that renders the generated component
  template: `
    <${wrappedElementName}>
      <ng-transclude ng-if="${transclude}"></ng-transclude>
    </${wrappedElementName}>
  `,

  // Should we transclude the component content based on the given configuration?
  transclude
})

export default createWrapperComponent
