enum PROMISE_STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}

type Executor = (resolve: Resolve, reject: Reject) => void
type Resolve = (value?: any) => void
type Reject = (reason?: any) => void
type OnFulfilled = (value?: any) => any
type OnRejected = (reason?: any) => any
type OnState = OnFulfilled | OnRejected

class iPromise<T = any, E = any> {
  private value: T
  private reason: E
  private onFulfilled: OnFulfilled
  private onRejected: OnRejected
  private onFulfilledFns: OnFulfilled[] = []
  private onRejectedFns: OnRejected[] = []

  constructor(executor: Executor, public status: number = PROMISE_STATUS.PENDING) {
    promiseConstructor.call(this, executor)
  }

  //用 then 保存存入的回调函数
  then = (onFulfilled: OnFulfilled, onRejected?: OnRejected) => {
    return new iPromise((resolve, reject) => {
      switch (this.status) {
        case PROMISE_STATUS.FULFILLED:
          if (onFulfilled) {
            handleThenProgress(onFulfilled, this.value, resolve, reject)
          }
          break
        case PROMISE_STATUS.REJECTED:
          if (onRejected) {
            handleThenProgress(onRejected, this.reason, resolve, reject)
          }
          break
        default:
          this.onFulfilledFns.push(() => {
            handleThenProgress(onFulfilled, this.value, resolve, reject)
          })
          if (onRejected) {
            this.onRejectedFns.push(() => {
                handleThenProgress(onRejected, this.reason, resolve, reject)
              }
            )
          }
      }
    })
  }
}

function handleThenProgress(
  onState: OnState,
  payload: any,
  resolve: Resolve,
  reject: Reject
) {
  try {
    const value = onState(payload)
    resolve(value)
  } catch (err) {
    reject(err)
  }
}

function promiseConstructor(executor: Executor) {
  const resolve = (value) => {
    queueMicrotask(() => {
      // 只有当前 promise 状态为 pending 时才改变状态
      if (this.status !== PROMISE_STATUS.PENDING) return
      this.status = PROMISE_STATUS.FULFILLED
      // 将用户调用 resolve 传入的参数保存起来
      this.value = value
      this.onFulfilledFns.forEach(fn => {
        fn(value)
      })
    })
  }
  const reject = (reason) => {
    queueMicrotask(() => {
      // 只有当前 promise 状态为 pending 时才改变状态
      if (this.status !== PROMISE_STATUS.PENDING) return
      this.status = PROMISE_STATUS.REJECTED
      // 将用户调用 reject 传入的参数保存起来
      this.reason = reason
      this.onRejectedFns.forEach(fn => {
        fn(reason)
      })
    })
  }
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

const p1 = new iPromise((resolve, reject) => {
  resolve('heee')
  // reject('errrrr')
})

p1.then((val) => {
  console.log(val, 'val')
  throw new Error('haha err le')
}, (err) => {
  console.log(err, 'err')
  return 'errhaha'
}).then((val1) => {
  console.log(val1, 'val1')
}, (err1) => {
  console.log('is:', err1.message)
})

export {}
