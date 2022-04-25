// keyof 遍历接口 T 中的所有字段
// T[P] 取接口 T 中的字段

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}


// type User = {
//     readonly name: string
// }
//
// const xiaohong: User = {
//     name: "xiaohong"
// }
//
// xiaohong.name = "123"

function readonly(obj) {
    const result = {}
    for (let key in obj) {
        result["readonly " + key] = obj[key]
    }
    return result
}

//1、返回一个对象
//2、遍历 obj (js=对象 ts=接口)
//3、加上 readonly 关键字
//4、通过 key 来获取 Obj 里面的值
