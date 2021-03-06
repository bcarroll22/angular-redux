import { expect } from 'chai'
import wrapActionCreators from './wrapActionCreators'

describe('Utils', () => {
  describe('wrapActionCreators', () => {
    it('should return a function that wraps argument in a call to bindActionCreators', () => {
      function dispatch (action) {
        return {
          dispatched: action
        }
      }

      const actionResult = { an: 'action' }

      const actionCreators = {
        action: () => actionResult
      }

      const wrapped = wrapActionCreators(actionCreators)

      expect(wrapped).to.be.a('function')
      expect(() => wrapped(dispatch)).to.not.throw()
      expect(() => wrapped().action()).to.throw()

      const bound = wrapped(dispatch)

      expect(bound.action).to.not.throw()
      expect(bound.action().dispatched).to.equal(actionResult)
    })
  })
})
