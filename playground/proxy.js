const obj = {
  name: 'w',
  age: 18
}

const objProxy = new Proxy(obj, {
  get(target, key) {
    console.log('getter')
    return target[key]
  },
  set(target, key, newVal) {
    console.log('setter')
    target[key] = newVal
  },
  has(target, key) {
    console.log('in')
    return key in target
  },
  delete(target, key) {
    console.log('delete')
    delete target[key]
  }
})

//objProxy.age = 20

// console.log(objProxy.name)
// console.log(objProxy.age)


/** receiver **/
const obj1 = {
  _name: 'wu',
  get name() {
    return this._name
  },
  set name(val) {
    this._name = val
  }
}

const p = new Proxy(obj1, {
  get(target, key, receiver) {
    console.log('1111')
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value)
  }
})

console.log(p.name)


