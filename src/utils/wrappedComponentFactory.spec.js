import { expect } from 'chai'
import createWrappedComponent from './wrappedComponentFactory'

describe('# Wrapped Component Factory', () => {
  describe('# Generate a wrapped component', () => {
    const wrapperName = 'test'
    const givenComponent = {
      bindings: { whatever: '<' },
      controller () {},
      template: '<div>This is just a hello world</div>'
    }

    it('should correctly create a wrapped component', () => {
      expect(createWrappedComponent(givenComponent, wrapperName)).to.have.property('require')
    })

    describe('# require key on created component', () => {
      givenComponent.require = {}
      givenComponent.require.test = '&'
      const wrappedComponent = createWrappedComponent(givenComponent, wrapperName)

      it('should keep the requires from a passed component', () => {
        expect(wrappedComponent.require).to.have.property('test')
      })

      it('should keep the bindings added by the generator', () => {
        expect(wrappedComponent.require).to.have.property('bindings')
      })
    })
  })
})
