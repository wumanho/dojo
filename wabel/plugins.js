const generate = require('@babel/generator').default;

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

/**
 * 注册到插件的函数的第一个参数就是所有 babel 的 api
 * @param types @babel/types
 * @param template @babel/template
 */
module.exports = function logHelper({types, template}) {
  return {
    visitor: {
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
    }
  }
}
