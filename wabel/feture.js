const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const template = require('@babel/template').default;

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
});

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

traverse(ast, {
  CallExpression(path, state) {
    // 如果是新插入的节点，不处理
    if (path.node.isNew) return
    // console.xxx
    const calleeName = generate(path.node.callee).code
    // 如果是 console.xxx
    if (targetCalleeName.includes(calleeName)) {
      const {line, column} = path.node.loc.start
      // 标记为新节点
      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)()
      newNode.isNew = true
      // 处理 jsx
      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]))
        path.skip()
      } else {
        path.insertBefore(newNode)
      }
    }
  }
})

// 生成最终的代码
const {code, map} = generate(ast);
console.log(code);
