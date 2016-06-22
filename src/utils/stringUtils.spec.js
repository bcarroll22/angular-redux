import { expect } from 'chai'
import { getComponentName, getDisplayName, getElementName } from './stringUtils'

describe('# Angular Redux String Utils', () => {
  const componentName = 'testComponent'
  const displayName = 'TestComponent'
  const elementName = 'test-component'

  it('Should get the display name from a component name', () => {
    expect(getDisplayName(componentName)).to.equal(displayName)
  })

  it('Should get a camel case component name', () => {
    expect(getComponentName(displayName)).to.equal(componentName)
  })

  describe('# element name', () => {
    it('Should get the element name from a display name', () => {
      expect(getElementName(displayName)).to.equal(elementName)
    })

    it('Should get the element name from a component name', () => {
      expect(getElementName(componentName)).to.equal(elementName)
    })

    it('Should give a default element name', () => {
      expect(getElementName()).to.equal('component')
    })
  })
})
