//** call **//

function icall(thisArg, ...rest) {
  // step 1 兼容非对象参数和空值
  thisArg = thisArg ? Object(thisArg) : window
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
  thisArg = thisArg ? Object(thisArg) : window
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

// console.log(applySum.iapply({
//   name: 'apply'
// }))

//** bind **//
function ibind(thisArg, ...argArray) {
  // 判空
  thisArg = thisArg ? Object(thisArg) : window
  thisArg.fn = this
  return function bindFn(...args) {
    // 拼接参数
    const finalArray = argArray.concat(...args)
    const result = thisArg.fn(...finalArray)
    delete thisArg.fn
    return result
  }
}

Function.prototype.ibind = ibind

function bindSum(num1, num2, num3, num4) {
  console.log(this, 'this')
  console.log(num3, 'num3')
  console.log(num4, 'num4')
  return num1 + num2
}

const newFn = bindSum.ibind({name: 'bb'}, 20, 30, 40, 50)

console.log(newFn())

