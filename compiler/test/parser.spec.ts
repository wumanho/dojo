import {test, expect} from "vitest";
import {tokenizer} from "../tokenizer";
import {NodeTypes, parser} from "../parser";

test('parser', () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens = tokenizer(code)
  const ast = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: NodeTypes.NumberLiteral,
        value: '2'
      }, {
        type: NodeTypes.CallExpression,
        name: 'subtract',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '4'
        }, {
          type: NodeTypes.NumberLiteral,
          value: '2'
        }]
      }]
    }]
  };
  expect(parser(tokens)).toEqual(ast)
})

test('parse number', () => {
  const code = `2`
  const tokens = tokenizer(code)
  const ast = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.NumberLiteral,
      value: '2'
    }]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('call expression', () => {
  const code = `(add 2 4)`
  const tokens = tokenizer(code)
  const ast = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: NodeTypes.NumberLiteral,
        value: '2'
      }, {
        type: NodeTypes.NumberLiteral,
        value: '4'
      }]
    }]
  };
  expect(parser(tokens)).toEqual(ast)
})

test('multi call expression', () => {
  const code = `(add 2 4) (add 3 5)`
  const tokens = tokenizer(code)
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '2'
        }, {
          type: NodeTypes.NumberLiteral,
          value: '4'
        }]
      },
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: '3'
        }, {
          type: NodeTypes.NumberLiteral,
          value: '5'
        }]
      }
    ]
  };
  expect(parser(tokens)).toEqual(ast)
})
