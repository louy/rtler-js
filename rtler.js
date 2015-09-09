var SWITCHABLE_AUTO = {
  'right': 'left',
  'margin': 'margin',
};
var SWITCHABLE_ZERO = {
  'padding': 'padding',
};

function removeComments(css) {
  return css.replace(/\/\*.*\*\//g,'');
}

function flip(css) {
  var flipped = removeComments(css);
  return flipped;
}

function override(css) {
  var overriden = css;
  return overriden;
}

module.exports = {
  flip: flip,
  override: override,
};
