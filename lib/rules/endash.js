/**
 * @fileoverview Rule to use endash in place of hyphens
 * @author Tuan Huynh
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const isValidLiteral = require('../util/isValidLiteral');
const report = require('../util/report');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'use endash for numeric ranges',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    // Matches: one or more digits, zero or more whitespace, hyphen,
    // zero or more whitespace, one or more digits
    const hypenatedNumericRange = /\d+\s*-\s*\d+/;
    const emdashSurroundedBySpaces = /\d+\s+–\s+\d+/;

    function checkString(node, isValid, value) {
      if (!isValid) {
        return;
      }

      if (value.match(hypenatedNumericRange)) {
        report(context, node, 'Use endash (–) instead of hyphen (-) for numeric ranges.');
      }
      if (value.match(emdashSurroundedBySpaces)) {
        report(context, node, 'Don’t surround the endash with spaces.');
      }
    }

    return {
      Literal(node) {
        checkString(
          node,
          isValidLiteral(node),
          node.value);
      },
      TemplateElement(node) {
        checkString(
          node,
          isValidLiteral(node.parent),
          node.value.raw);
      },
    };
  },
  fix() {

  },
};
