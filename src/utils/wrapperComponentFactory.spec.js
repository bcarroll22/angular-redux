import { expect } from 'chai'
import wrapActionCreators from '../utils/wrapActionCreators'
import createWrapperComponent from './wrapperComponentFactory'

describe('# Wrapper Component Factory', () => {
  describe('# Generate a wrapper component', () => {
    const action = () => ({ type: '@@FAKE_ACTION' })
    const bindings = { whatever: '<' }
    const mapState = () => ({ test: 'string' })
    const mapDispatch = wrapActionCreators({ action })
    const shouldSubscribe = true
    const transclude = true
    const wrappedElementName = 'test-component'
    const wrappedComponentName = 'testComponent'

    describe('# the wrapper component', () => {
      const wrapperComponent = createWrapperComponent({
        bindings,
        mapState,
        transclude,
        mapDispatch,
        shouldSubscribe,
        wrappedElementName,
        wrappedComponentName
      })

      describe('# bindings', () => {
        it('should have a bindings properties', () => {
          expect(wrapperComponent).to.have.property('bindings')
        })

        it('should have the specified bindings', () => {
          expect(wrapperComponent.bindings).to.eql({ whatever: '<' })
        })
      })

      describe('# template', () => {
        const template = '\n    <test-component>\n      <ng-transclude ng-if="true"></ng-transclude>\n    </test-component>\n  '
        it('should render the wrapped component element', () => {
          expect(wrapperComponent.template).to.equal(template)
        })
      })

      describe('# require', () => {
        it('should have a require property', () => {
          expect(wrapperComponent).to.have.property('require')
        })

        it('should require the store', () => {
          expect(wrapperComponent.require).to.eql({ store: '^^provider' })
        })
      })
    })
  })
})
