const getDevTools = () => (window.devToolsExtension ? window.devToolsExtension() : f => f)

export default getDevTools
