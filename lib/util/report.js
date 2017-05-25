/**
 * @fileoverview Util to report a node
 * @author Tuan Huynh
 */


module.exports = function report(context, node, message) {
  context.report({
    node,
    message,
    data: { name: node.name },
  });
};
