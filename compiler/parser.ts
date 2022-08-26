import {Token, TokenTypes} from "./tokenizer";

export enum NodeTypes {
  Program = 'Program',
  NumberLiteral = 'NumberLiteral',
  CallExpression = 'CallExpression'
}

export interface RootNode {
  type: NodeTypes.Program
  body: childNode[]
}

export type childNode = NumberNode | CallExpressionNode

interface NumberNode {
  type: NodeTypes.NumberLiteral
  value: string
}

export interface CallExpressionNode {
  type: NodeTypes.CallExpression
  name: string,
  params: childNode[]
}


export function parser(tokens: Token[]) {
  const root = createRoot()
  let current = 0
  // 每个 walk 负责处理每个括号内的程序
  const walk = () => {
    let token = tokens[current]
    // 普通数字节点
    if (token.type === TokenTypes.Number) {
      current++
      return createNumberNode(token.value)
    }
    // ( 开头代表了表达式
    if (token.type === TokenTypes.Paren && token.value === '(') {
      // 当前指针指向的是 {type: TokenTypes.Paren, value: '('},
      // 所以要往前移动一位，指向例如  {type: TokenTypes.Name, value: 'add'},
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)
      token = tokens[++current]
      // 碰到右括号结束
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        node.params.push(walk())
        token = tokens[current]
      }
      current++
      return node
    }
  }
  while (current < tokens.length) {
    root.body.push(walk())
  }
  return root
}

/**
 * 创建根节点
 */
function createRoot(): RootNode {
  return {
    type: NodeTypes.Program,
    body: []
  }
}

/**
 * 创建数字节点，可能作为参数或者只是值本身
 * @param value 值
 */
function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value
  }
}

/**
 * 创建表达式节点
 * @param name 表达式名称
 */
function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  }
}
