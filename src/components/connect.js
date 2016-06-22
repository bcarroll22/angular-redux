import angular from 'angular'

import wrapActionCreators from '../utils/wrapActionCreators'
import createWrappedComponent from '../utils/wrappedComponentFactory'
import createWrapperComponent from '../utils/wrapperComponentFactory'
import { getDisplayName, getElementName } from '../utils/stringUtils'

const defaultMapStateToBindings = state => ({})
const defaultMapDispatchToBindings = dispatch => ({ dispatch })

function connect (mapStateToBindings, mapDispatchToBindings) {
  const shouldSubscribe = Boolean(mapStateToBindings)
  const mapState = mapStateToBindings || defaultMapStateToBindings

  let mapDispatch

  if (typeof mapDispatchToBindings === 'function') {
    mapDispatch = mapDispatchToBindings
  } else if (!mapDispatchToBindings) {
    mapDispatch = defaultMapDispatchToBindings
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToBindings)
  }

  return function wrapWithConnect (GivenComponent) {
    const { bindings, name, transclude } = GivenComponent
    const wrappedComponentName = `connect${getDisplayName(name)}`
    const wrappedElementName = `connect-${getElementName(name)}`

    const WrappedComponent = createWrappedComponent(GivenComponent)

    angular.module('angular-redux.connectedComponents')
      .component(wrappedComponentName, WrappedComponent)

    return createWrapperComponent({
      bindings,
      mapState,
      transclude,
      mapDispatch,
      shouldSubscribe,
      wrappedElementName,
      wrappedComponentName
    })
  }
}

export default connect
