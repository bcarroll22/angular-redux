require('./jsdom.helper')

const testDirGlobs = [
  './src/**/*.spec.js'
]

const runRelative = filePath =>
  require(`../${filePath}`)

const glob =
  require('glob-fs')({ gitignore: true })

const searchDir = dir =>
  glob.readdirSync(dir).forEach(runRelative)

testDirGlobs.forEach(searchDir)
