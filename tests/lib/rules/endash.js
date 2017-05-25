/**
 * @fileoverview Tests for endash rule.
 * @author Tuan Huynh
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/endash');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

/* eslint-disable quotes */

const parserOptions = {
  ecmaVersion: 6,
};

const ruleTester = new RuleTester();
ruleTester.run('endash', rule, {
  valid: [
    // using endash
    "'1–2';",

    // normal dash in a object property
    "var bar = {'1-2': 'foo'};",

    // normal dash in a member expression identifier
    "bar['1-2'];",

    // NOTE: you cannot use template literals in an object
  ],
  invalid: [
    // using hyphen for a numeric range in string literal
    {
      code: "'1-2';",
      errors: [{
        message: 'Use endash (–) instead of hyphen (-) for numeric ranges.',
        type: 'Literal' }],
    },

    // using hyphen for a numeric range in string literal
    {
      code: "'1 - 2';",
      errors: [
        {
          message: 'Use endash (–) instead of hyphen (-) for numeric ranges.',
          type: 'Literal',
        },
        // TODO: this test should show two error messages
        // {
        //   message: 'Don’t surround the dash with spaces.',
        //   type: 'Literal',
        // }
      ],
    },

    // using hyphen for a numeric range in template string
    {
      code: "`1-2`;",
      parserOptions,
      errors: [{
        message: 'Use endash (–) instead of hyphen (-) for numeric ranges.',
        type: 'TemplateElement',
      }],
    },

    // using endash, but surrounded by spaces
    {
      code: "'1 – 2';",
      errors: [{
        message: "Don’t surround the endash with spaces.",
        type: 'Literal',
      }],
    },
    // TODO
    // {
    //   code: "`1 – 2`;",
    //   errors: [{
    //     message: "Don’t surround the endash with spaces.",
    //     type: 'TemplateElement',
    //   }],
    // },
  ],
});
