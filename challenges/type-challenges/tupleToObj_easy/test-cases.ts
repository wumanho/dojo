import type {Equal, Expect} from '@type-challenges/utils'

// 在 ts 中 as const = '字面量类型'，跟 js 的 const 有一定区别
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type r = typeof tuple

type cases = [
    Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
