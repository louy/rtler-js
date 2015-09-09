var css = require('css');

var SWITCHABLE_AUTO = [
  'right',
  'left',
  'margin-right',
  'margin-left',
];
var SWITCHABLE_ZERO = [
  'padding-right',
  'padding-left',
];
var QUAD_VALUE = [
  'margin',
  'padding',
];

function switchPropertyName(property) {
  return property
                .replace('right', 'RIGHT')
                .replace('left', 'right')
                .replace('RIGHT', 'left');
}

function flip(cssText) {
  var options = { compress: true };

  var json = css.parse(cssText, options);

  json.stylesheet.rules.forEach(function(rule) {
    var declarations = [], properties = [];

    rule.declarations.forEach(function(declaration) {
      if (QUAD_VALUE.indexOf(declaration.property) > -1) {
        var value = declaration.value.split(' ');
        if (value.length === 4) {
          declaration.value = [value[0], value[3], value[2], value[1]].join(' ');
          properties.push(declaration.property);
          declarations.push(declaration);
        }
      } else
      if (SWITCHABLE_AUTO.indexOf(declaration.property) > -1 ||
          SWITCHABLE_ZERO.indexOf(declaration.property) > -1) {
        declaration.property = switchPropertyName(declaration.property);
        properties.push(declaration.property);
        declarations.push(declaration);
      }
    });

    declarations.forEach(function(declaration) {
      var opposite = switchPropertyName(declaration.property);
      if (properties.indexOf(opposite) < 0) {
        if (SWITCHABLE_AUTO.indexOf(opposite) > -1) {
          declarations.push({
            type: 'declaration',
            property: opposite,
            value: 'auto',
          });
          properties.push(opposite);
        } else if (SWITCHABLE_ZERO.indexOf(opposite) > -1) {
          declarations.push({
            type: 'declaration',
            property: opposite,
            value: '0',
          });
          properties.push(opposite);
        }
      }
    });

    rule.declarations = declarations;
  });

  json.stylesheet.rules = json.stylesheet.rules.filter(function(rule) {
    return rule.declarations.length > 0;
  });

  return css.stringify(json, options);
}

function override(css) {
  var overriden = css;
  return overriden;
}

module.exports = {
  flip: flip,
  override: override,
};
