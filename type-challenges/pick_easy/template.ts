/**
 * ts 遍历联合类型 union [P in K]
 * T[P]: 从 T 中取 P 值
 * extends keyof : K 必须是 T 的 key
 */
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

/**
 *  js 实现版本
 *  1. 返回一个对象
 *  2. 遍历 keys 参数
 *  3. 取 todo{} 对象中的 key 值 todo[key]
 *  4. 判断 key 是否存在
 * @param todo 接口
 * @param keys 参数
 */
function myPick(todo, keys) {
    const obj = {}
    keys.forEach(key => {
        if (key in todo) {
            obj[key] = todo[key]
        }
    })
    return obj
}
