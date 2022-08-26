import {expect, test} from "vitest";
import {NodeTypes} from "../parser";
import {traverser, Visitor} from "../traverser";
import {tokenizer} from "../tokenizer";
import {parser} from "../parser";
// 遍历树
test("traverser", () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens = tokenizer(code)
  const ast = parser(tokens)
  const callCounts = [];
  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callCounts.push(["program-enter", node.type, ""]);
      },
      exit(node, parent) {
        callCounts.push(["program-exit", node.type, ""]);
      },
    },

    CallExpression: {
      enter(node, parent) {
        callCounts.push(["callExpression-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["callExpression-exit", node.type, parent!.type]);
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        callCounts.push(["numberLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["numberLiteral-exit", node.type, parent!.type]);
      },
    },
  };

  traverser(ast, visitor);
  expect(callCounts).toEqual([
    ["program-enter", NodeTypes.Program, ""],
    ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Program],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    [
      "callExpression-enter",
      NodeTypes.CallExpression,
      NodeTypes.CallExpression,
    ],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Program],
    ["program-exit", NodeTypes.Program, ""],
  ]);
});
