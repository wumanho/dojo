enum PROMISE_STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}

type Executor = (resolve: Resolve, reject: Reject) => void
type Resolve = (value?: any) => void
type Reject = (reason?: any) => void
type OnFulfilled = Resolve
type OnRejected = Reject

class iPromise<T = any> {
  private readonly status: number
  private value: T
  private reason: any
  private onFulfilled: OnFulfilled
  private onRejected: OnRejected
  private onFulfilledFns: OnFulfilled[] = []
  private onRejectedFns: OnRejected[] = []

  constructor(executor: Executor) {
    this.status = PROMISE_STATUS.PENDING
    promiseConstructor.call(this, executor)
  }

  //用 then 保存存入的回调函数
  then = (onFulfilled: OnFulfilled, onRejected?: OnRejected) => {
    switch (this.status) {
      case PROMISE_STATUS.FULFILLED:
        if (onFulfilled) onFulfilled(this.value)
        break
      case PROMISE_STATUS.REJECTED:
        if (onRejected) onRejected(this.reason)
        break
      default:
        this.onFulfilledFns.push(onFulfilled)
        if (onRejected) {
          this.onRejectedFns.push(onRejected)
        }
    }
  }
}

function promiseConstructor(executor: Executor) {
  const resolve = (value) => {
    queueMicrotask(() => {
      // 只有当前 promise 状态为 pending 时才改变状态
      if (this.status !== PROMISE_STATUS.PENDING) return
      console.log('resolve')
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
      console.log('reject')
      this.status = PROMISE_STATUS.REJECTED
      // 将用户调用 reject 传入的参数保存起来
      this.reason = reason
      this.onRejectedFns.forEach(fn => {
        fn(reason)
      })
    })
  }

  executor(resolve, reject)
}

const p1 = new iPromise((resolve, reject) => {
  reject('errrrr')
  resolve('heee')
})

p1.then((res) => {
  console.log(res)
}, (err) => {
  console.log('123123')
})

p1.then((res) => {
  console.log('res1', res)
})

setTimeout(() => {
  p1.then((res) => {
    console.log('res2', res)
  })
}, 1000)

export {}
