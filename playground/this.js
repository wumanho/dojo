// setTimeout(function () {
//   console.log(this)
// }, 2000)

// const box = document.querySelector('.box')
// // box.onclick = function () {
// //   console.log(this)
// // }
//
// box.addEventListener('click', function () {
//   console.log(this)
// })

// ['a','b','c'].forEach(function (item) {
//   console.log(item)
//   console.log(this)
// })


// const obj = {
//   name: 'hi',
//   foo: function () {
//     console.log(this)
//   }
// }
//
// const f = new obj.foo()


// function foo() {
//   console.log(this)
// }
//
// const bar = foo.bind('aaa')
// const f = new bar()

//
// const obj = {
//   data: [],
//   getData: function () {
//     setTimeout(() => {
//       console.log(this)
//       this.data = [1, 2, 3]
//     }, 2000)
//   }
// }
//
// obj.getData()

const name = 'window'

const person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  }
}

function sayName() {
  const ss = person.sayName;
  ss();
  person.sayName();
  (person.sayName)();
  (b = person.sayName)();
}

sayName()
