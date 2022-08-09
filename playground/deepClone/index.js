const {deepClone} = require('./v3')


const obj = {
  name: "wumanho",
  age: 18,
  inner: {
    cas: 'dp',
    age: 18,
    address: {
      locate: 'gz'
    }
  },
  friends:['onea','oneb','onec']
}

const newObj = deepClone(obj)
console.log(newObj === obj, 'boo')
newObj.inner.age = 19
newObj.friends[0] = 'ggjj'
console.log(obj, 'obj')
