const createdWrappedComponent = (component) => {
  return {
    ...component,
    require: {
      ...component.require,
      bindings: `^^${component.name}`
    }
  }
}

export default createdWrappedComponent
