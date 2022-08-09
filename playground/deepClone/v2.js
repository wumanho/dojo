/**
 * 基本处理，考虑对象嵌套，数组和函数拷贝
 */
function deepClone(source) {
  // 首先判断是否为函数 或者 非对象类型直接返回
  if (isAFunction(source) || isNotAnObject(source)) return source
  // 对象 & 数组类型处理
  const newObject = Array.isArray(source) ? [] : {}
  for (const key in source) {
    newObject[key] = deepClone(source[key])
  }

  return newObject
}

function isNotAnObject(val) {
  return typeof val !== 'object'
}

function isAFunction(fun) {
  return typeof fun !== 'function'
}

module.exports = {deepClone}
