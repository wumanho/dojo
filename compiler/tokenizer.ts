interface Token {
  type: TokenTypes,
  value: string
}

export enum TokenTypes {
  paren,
  Name,
}

export function tokenizer(code: string): Token[] {
  const tokens: Token[] = []
  let current = 0
  let char = code[current]
  if (char === '(') {
    tokens.push({
      type: TokenTypes.paren,
      value: char
    })
  }
  return tokens
}
