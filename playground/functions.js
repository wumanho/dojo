//** call **//

function icall(thisArg, ...rest) {
  // step 1 兼容非对象参数和空值
  thisArg = thisArg || window
  // step 2 调用这个函数，绑定 this，记录返回值
  thisArg.fn = this
  const result = thisArg.fn(...rest)
  // step 3 调用完成之后，删除这个 fn 属性
  delete thisArg.fn
  // step 4 返回结果
  return result
}

Function.prototype.icall = icall


function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  return num1 + num2
}

// foo.icall({
//   name: 'hi'
// })

//** apply **//
function iapply(thisArg, argArray = []) {
  // 判空
  thisArg = thisArg || window
  // apply
  thisArg.fn = this
  const result = thisArg.fn(...argArray)
  // delete
  delete thisArg.fn
  return result
}

Function.prototype.iapply = iapply

function applySum(num1, num2) {
  console.log(this)
  return num1 + num2
}

console.log(applySum.iapply({
  name: 'apply'
}))

//** bind **//

