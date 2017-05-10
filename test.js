// BEGIN IMPORTS
var fs = require('fs')
var path = require('path')
var css = require('css')
var styletronLoader = require('./');
var _ = require('lodash')
// END IMPORTS

// Load test CSS file
var source = fs.readFileSync(path.resolve('styles.css'), 'utf-8')

console.log(styletronLoader(source))
