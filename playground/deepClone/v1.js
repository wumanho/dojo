/**
 * 基本处理，考虑对象嵌套
 */
function deepClone(source) {
  // 非对象类型直接返回
  if (isNotObject(source)) return source
  // 对象类型处理
  const newObject = {}
  for (const key in source) {
    newObject[key] = deepClone(source[key])
  }

  return newObject
}

function isNotObject(val) {
  const valType = typeof val
  return valType !== 'object'
}

module.exports = {deepClone}
