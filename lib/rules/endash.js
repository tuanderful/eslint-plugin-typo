/**
 * @fileoverview Rule to use endash in place of hyphens
 * @author Tuan Huynh
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const isValidLiteral = require('../util/isValidLiteral');

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
    function report(node, message = 'Use endash (–) instead of hyphen (-) for numeric ranges.') {
      context.report({
        node,
        message,
        data: { name: node.name },
      });
    }

    // Matches:
    //   one or more digits,
    //   zero or more whitespace,
    //   hyphen,
    //   zero or more whitespace,
    //   one or more digits
    const hypenatedNumericRange = /\d+\s*-\s*\d+/;

    const emdashSurroundedBySpaces = /\d+\s+–\s+\d+/;

    return {
      Literal(node) {
        if (!isValidLiteral(node)) {
          return;
        }

        if (node.value.match(hypenatedNumericRange)) {
          report(node);
        }
        if (node.value.match(emdashSurroundedBySpaces)) {
          report(node, 'Don’t surround the endash with spaces.');
        }
      },
      TemplateElement(node) {
        if (!isValidLiteral(node.parent)) {
          return;
        }

        if (node.value.raw.match(hypenatedNumericRange)) {
          report(node);
        }
        if (node.value.raw.match(emdashSurroundedBySpaces)) {
          report(node, 'Don’t surround the endash with spaces.');
        }
      },
    };
  },
  fix() {

  },
};
