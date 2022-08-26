import {childNode, NodeTypes, RootNode} from "./parser";

export interface Visitor {
  Program?: VisitorOptions
  CallExpression?: VisitorOptions
  NumberLiteral?: VisitorOptions
}

export type Node = RootNode | childNode
export type ParentNode = Node | null

interface VisitorOptions {
  enter(node: Node, parent?: Node)

  exit?(node: Node, parent?: Node)
}


export function traverser(ast: RootNode, visitor: Visitor) {
  traverNodes(ast, null, visitor)
}

function traverNodes(node: Node, parentNode: ParentNode, visitor?: Visitor) {
  const option = visitor[node.type]
  if (option.enter) option.enter(node, parentNode)
  switch (node.type) {
    case NodeTypes.NumberLiteral:
      break
    case NodeTypes.CallExpression:
      traverArray(node.params, node, visitor)
      break
    default:
    case NodeTypes.Program:
      traverArray(node.body, node, visitor)
      break
  }
  if (option.exit) option.exit(node, parentNode)
}

function traverArray(nodes: childNode[], parentNode: ParentNode, visitor: Visitor) {
  nodes.forEach(node => {
    traverNodes(node, parentNode, visitor)
  })
}
