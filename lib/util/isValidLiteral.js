/**
 * @fileoverview Util to check if string literal is valid for checking typography rules.
 * @author Tuan Huynh
 */

module.exports = function isValidLiteral(node) {
  // Don't apply rules to literals used as:
  //  - object keys
  //  - member expression identifiers
  if (node.parent.type === 'Property' ||
    node.parent.type === 'MemberExpression') {
    return false;
  }

  return true;
};
