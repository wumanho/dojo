import {test, expect} from "vitest";
import {tokenizer, TokenTypes} from "../tokenizer";

/**
 *  解析左括号
 */
test('left paren', () => {
  const code = '('
  const tokens = [{type: TokenTypes.Paren, value: '('},]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  解析右括号
 */
test('right paren', () => {
  const code = ')'
  const tokens = [{type: TokenTypes.Paren, value: ')'},]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  解析 name
 */
test('add', () => {
  const code = 'add'
  const tokens = [{type: TokenTypes.Name, value: 'add'},]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  解析 number
 */
test('number', () => {
  const code = '11'
  const tokens = [{type: TokenTypes.Number, value: '11'},]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  简单 combine
 */
test('(add 1 2)', () => {
  const code = '(add 1 2)'
  const tokens = [
    {type: TokenTypes.Paren, value: '('},
    {type: TokenTypes.Name, value: 'add'},
    {type: TokenTypes.Number, value: '1'},
    {type: TokenTypes.Number, value: '2'},
    {type: TokenTypes.Paren, value: ')'}
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  复杂 combine
 */
test('tokenizer', () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens = [
    {type: TokenTypes.Paren, value: '('},
    {type: TokenTypes.Name, value: 'add'},
    {type: TokenTypes.Number, value: '2'},
    {type: TokenTypes.Paren, value: '('},
    {type: TokenTypes.Name, value: 'subtract'},
    {type: TokenTypes.Number, value: '4'},
    {type: TokenTypes.Number, value: '2'},
    {type: TokenTypes.Paren, value: ')'},
    {type: TokenTypes.Paren, value: ')'}
  ]
  expect(tokenizer(code)).toEqual(tokens)
})


