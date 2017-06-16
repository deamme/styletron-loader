var css = require("css");
var _ = require("lodash");

function getStyles(decl) {
  var stylesObj = {};
  decl.forEach(function(obj) {
    stylesObj[obj.property] = obj.value;
  });
  return stylesObj;
}

function normalizeParsedStyles(selectors, block, media) {
  block.selectors.forEach(function(selector) {
    var pseudo = selector.split(":")[1];
    selector = selector.split(":")[0];

    if (!selectors[selector]) {
      selectors[selector] = {};
    }

    if (pseudo) {
      selectors[selector][":" + pseudo] = _.assign(
        selectors[selector][":" + pseudo],
        getStyles(block.declarations)
      );
    } else if (media) {
      selectors[selector]["@media " + media] = _.assign(
        selectors[selector][media],
        getStyles(block.declarations)
      );
    } else {
      selectors[selector] = _.assign(
        selectors[selector],
        getStyles(block.declarations)
      );
    }
  });
}

module.exports = function(source) {
  var parsedStyles = css.parse(source).stylesheet.rules;

  var selectors = {};

  parsedStyles.forEach(function(block) {
    if (block.type == "rule") {
      normalizeParsedStyles(selectors, block);
    } else if (block.type == "media") {
      block.rules.forEach(function(rules) {
        normalizeParsedStyles(selectors, rules, block.media);
      });
    }
  });

  return selectors;
};
