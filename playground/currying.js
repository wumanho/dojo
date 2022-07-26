function add(x, y, z) {
  return x + y + z
}

add(1, 2, 3)

/**currying demo **/
function sum(x) {
  return function (y) {
    return function (z) {
      return x + y + z
    }
  }
}

//console.log(sum(1)(2)(3))

/** currying **/
function iCurrying(fn) {
  // 获取原始函数的参数个数
  const argLength = fn.length

  // 结果函数
  function curried(...args) {
    // 当参数个数等于原函数的参数个数时，直接调用即可
    if (args.length >= argLength) {
      return fn.apply(this, args)
    } else {
      return function curriedProgress(...argsP) {
        return curried.apply(this, [...args, ...argsP])
      }
    }
  }

  return curried
}


function add1(x, y, z) {
  return x + y + z
}

const curryAdd = iCurrying(add1)

console.log(curryAdd(10,20,30))
console.log(curryAdd(10,20)(30))
console.log(curryAdd(10)(20)(30))

