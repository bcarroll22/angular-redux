const webpack = require('webpack')
const env = process.env.NODE_ENV

const reactExternal = {
  root: 'Angular',
  commonjs2: 'angular',
  commonjs: 'angular',
  amd: 'angular'
}

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
}

const config = {
  externals: {
    'angular': reactExternal,
    'redux': reduxExternal
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'AngularRedux',
    libraryTarget: 'umd'
  },
  plugins: [
    {
      apply: function apply (compiler) {
        compiler.parser.plugin('expression global', function expressionGlobalPlugin () {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
          return false
        })
      }
    },
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
