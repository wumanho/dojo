/** 01 **/
setTimeout(() => {
  console.log('setTimeout1')

  new Promise((resolve) => {
    resolve()
  }).then(() => {
    new Promise((resolve) => {
      resolve()
    }).then(() => {
      console.log('then4')
    })
    console.log('then2')
  })
})

new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('then1')
})

setTimeout(() => {
  console.log('setTimeout2')
})

console.log(2)

queueMicrotask(() => {
  console.log('queuetask')
})

new Promise((resolve) => {
  resolve()
}).then(() => {
  console.log('then3')
})

/**
 * promise1
 * 2
 * then1
 * queuetask
 * then3
 * setTimeout1
 * then2
 * then4
 * setTimeout2
 */


/** 02 **/
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2');
})

console.log('script end');

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
 * promise2
 * setTimeout
 */

// Promise.resolve().then(() => {
//   console.log(0)
//   return Promise.resolve(4)
// }).then((res) => {
//   console.log(res)
// })
//
//
// Promise.resolve().then(() => {
//   console.log(1)
// }).then(() => {
//   console.log(2)
// }).then(() => {
//   console.log(3)
// }).then(() => {
//   console.log(5)
// }).then(() => {
//   console.log(6)
// })
