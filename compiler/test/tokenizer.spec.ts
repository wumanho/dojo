import {test,expect} from "vitest";
import {tokenizer,TokenTypes} from "../tokenizer";

test.skip('tokenizer',()=>{
  const code = `(add 2 (subtract 4 2))`
  const tokens = [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'subtract' },
    { type: 'number', value: '4'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
    { type: 'paren',  value: ')'        }
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  解析括号
 */
test('paren',()=>{
  const code = '('
  const tokens = [{ type: TokenTypes.paren,  value: '('},]
  expect(tokenizer(code)).toEqual(tokens)
})

/**
 *  解析括号
 */
test('add',()=>{
  const code = 'add'
  const tokens = [{ type: TokenTypes.Name,  value: 'add'},]
  expect(tokenizer(code)).toEqual(tokens)
})


