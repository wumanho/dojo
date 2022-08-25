export interface Token {
  type: TokenTypes,
  value: string
}

export enum TokenTypes {
  Paren,
  Name,
  Number,
}

export function tokenizer(code: string): Token[] {
  const tokens: Token[] = []
  let current = 0
  while (current < code.length){
    let char = code[current]

    //判断是否空格
    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    // paren
    if (char === '(' || char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char
      })
      current++
      continue
    }
    // name
    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)){
      let value = ''
      while (LETTERS.test(char) && current < code.length){
        value += char
        char = code[++current]
      }
      tokens.push({
        type:TokenTypes.Name,
        value:value
      })
    }

    //number
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)){
      let value = ''
      while (NUMBERS.test(char) && current < code.length){
        value += char
        char = code[++current]
      }
      tokens.push({
        type:TokenTypes.Number,
        value:value
      })
    }
  }

  return tokens
}
