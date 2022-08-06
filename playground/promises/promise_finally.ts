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
type OnFinally = (value?: any) => any
type OnState = OnFulfilled | OnRejected
type Promises = iPromise[]

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

  static resolve = (value) => {
    return new iPromise((resolve: Resolve) => {
      resolve(value)
    })
  }

  static reject = (reason) => {
    return new iPromise((resolve: Resolve, reject: Reject) => {
      reject(reason)
    })
  }

  static all = (promises: Promises) => {
    return new iPromise((resolve, reject) => {
      const value = []
      promises.forEach(p => {
        p.then(res => {
          value.push(res)
          if (value.length === promises.length) resolve(value)
        }, e => {
          reject(e)
        })
      })
    })
  }

  //用 then 保存存入的回调函数
  then = (onFulfilled: OnFulfilled, onRejected?: OnRejected) => {
    // 用于为 catch 捕获
    const defaultOnRejected = err => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    // 用于 finally
    const defaultOnFinally = value => {
      return value
    }
    onFulfilled = onFulfilled || defaultOnFinally

    return new iPromise((resolve: Resolve, reject: Reject) => {
      switch (this.status) {
        case PROMISE_STATUS.FULFILLED:
          handleThenProgress(onFulfilled, this.value, resolve, reject)
          break
        case PROMISE_STATUS.REJECTED:
          handleThenProgress(onRejected, this.reason, resolve, reject)
          break
        default:
          this.onFulfilledFns.push(() => {
            handleThenProgress(onFulfilled, this.value, resolve, reject)
          })
          this.onRejectedFns.push(() => {
              handleThenProgress(onRejected, this.reason, resolve, reject)
            }
          )
      }
    })
  }

  catch = (onRejected: OnRejected) => {
    return this.then(null, onRejected)
  }

  finally = (onFinally: OnFinally) => {
    this.then(val => {
      onFinally(val)
    }).catch(err => {
      onFinally(err)
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
  setTimeout(() => {
    resolve('p1')
  }, 1000)
})
const p2 = new iPromise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 2000)
})
const p3 = new iPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})

iPromise.all([p1, p2, p3]).then(res => {
  console.log(res, 'res')
})

export {}
