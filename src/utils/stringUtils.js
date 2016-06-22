import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import upperFirst from 'lodash/upperFirst'

export const getComponentName = name => camelCase(name || 'Component')

export const getDisplayName = name => upperFirst(getComponentName(name))

export const getElementName = name => kebabCase(name || 'component')
