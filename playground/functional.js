/** call **/

function icall(thisArg, ...rest) {
  // step 1 兼容非对象参数和空值
  thisArg = thisArg ? Object(thisArg) : window
  // step 2 调用这个函数，绑定 this，记录返回值
  const sy = Symbol()
  thisArg[sy] = this
  const result = thisArg[sy](...rest)
  // step 3 调用完成之后，删除这个 fn 属性
  delete thisArg[sy]
  // step 4 返回结果
  return result
}

Function.prototype.icall = icall


function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  console.log('sum', this)
  return num1 + num2
}

// foo.icall({
//   name: 'hi'
// })

// console.log(sum.icall({a: 'a'}, 2, 3))

/** apply **/
function iapply(thisArg, argArray = []) {
  // 判空
  thisArg = thisArg ? Object(thisArg) : window
  // apply
  const sy = Symbol()
  thisArg[sy] = this
  const result = thisArg[sy](...argArray)
  // delete
  delete thisArg[sy]
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

/** bind **/
function ibind(thisArg, ...argArray) {
  // 判空
  thisArg = thisArg ? Object(thisArg) : window
  const sy = Symbol()
  thisArg[sy] = this
  return function bindFn(...args) {
    // 拼接参数
    const finalArray = argArray.concat(...args)
    const result = thisArg[sy](...finalArray)
    delete thisArg[sy]
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

/** pure function **/

let bird = 'bird'
// 1. 相同的输入必定输出相同的输出
// 2. 没有产生副作用
function pureSample(num1, num2) {
  return num1 * 2 + num2
}

// 1. 产生副作用
function inPureSample() {
  bird = 'dog'
  console.log(bird)
}

// 1. 相同的输入必定输出相同的输出
// 2. 没有对传入的参数做直接修改，所以不会产生副作用
const pureObj = {
  name: 'hi',
  age: 18
}

function pureSample1(info) {
  return {
    ...info,
    age: 88
  }
}

// console.log(pureSample1(pureObj))





