const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

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

// 将源码生成 ast 树
const ast = parser.parse(sourceCode, {
  // unambiguous 根据内容是否有 import 和 export 来自动设置是否解析 es module 模块
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);


// 遍历 ast，遇到表达式时，作出修改
traverse(ast, {
  // 表达式 visitor，这是一种观察者模式，类似回调
  CallExpression(path, state) {
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const {line, column} = path.node.loc.start;
      path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
    }
  }
})

// 生成最终的代码
const {code, map} = generate(ast);
console.log(code);


