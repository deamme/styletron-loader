var get = require('lodash/get')
var assign = require('lodash/assign')

module.exports = function(selectors) {
	return function() {
		var stylesObj = {}
		var splittedArgs = arguments[0].split(' ')
		if (splittedArgs.length > 1) {
			for (var i = 0; i < splittedArgs.length; i++) {
				assign(stylesObj, get(selectors, splittedArgs[i]))
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				assign(stylesObj, get(selectors, arguments[i]))
			}
		}
		return stylesObj
	}
}