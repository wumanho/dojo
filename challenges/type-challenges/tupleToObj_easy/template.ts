/**
 * ts 遍历数组： in T[number]
 */
type TupleToObject<T extends readonly string[]> = {
    [F in T[number]]: F
}

// js
function tupleObject(arr) {
    const obj = {}
    arr.forEach(val => {
        obj[val] = val
    })
    return obj
}
