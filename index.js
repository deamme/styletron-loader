var css = require('css')
var _ = require('lodash')

function getStyles(decl) {
  var stylesObj = {}
  decl.forEach(function (obj) {
    stylesObj[obj.property] = obj.value
  })
  return stylesObj
}

function normalizeParsedStyles(selectors, block, media) {
  block.selectors.forEach(function (selector) {
    var pseudo = selector.split(':')[1]
    selector = selector.split(':')[0]

    if (!selectors[selector]) {
      selectors[selector] = {}
    }

    if (pseudo) {
      selectors[selector][':' + pseudo] = _.assign(
        selectors[selector][':' + pseudo],
        getStyles(block.declarations)
      )
    } else if (media) {
      selectors[selector][media] = _.assign(
        selectors[selector][media],
        getStyles(block.declarations)
      )
    } else {
      selectors[selector] = _.assign(
        selectors[selector],
        getStyles(block.declarations)
      )
    }
  })
}

module.exports = function styletronLoader(source) {
  var parsedStyles = css.parse(source).stylesheet.rules

  var selectors = {}

  parsedStyles.forEach(function (block) {
    if (block.type == 'rule') {
      normalizeParsedStyles(selectors, block)
    } else if (block.type == 'media') {
      block.rules.forEach(function (rules) {
        normalizeParsedStyles(selectors, rules, block.media)
      })
    }
  })

  return function() {
  	var stylesObj = {}
  	var splittedArgs = arguments[0].split(' ')
  	if (splittedArgs.length > 1) {
  		for (var i = 0; i < splittedArgs.length; i++) {
  			_.assign(stylesObj, _.get(selectors, splittedArgs[i]))
  		}
  	} else {
  		for (var i = 0; i < arguments.length; i++) {
  			_.assign(stylesObj, _.get(selectors, arguments[i]))
  		}
  	}
  	return stylesObj
  }
}
