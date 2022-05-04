/**
 * 有限状态机实现
 * @param string 输入的字符串
 */
function test(string) {
    let i = 0
    let startIndex
    let endIndex

    function waitForA(char) {
        if (char === "a") {
            startIndex = i
            return waitForB
        } else {
            return waitForA
        }
    }

    function waitForB(char) {
        if (char === "b") {
            return waitForC
        } else {
            return waitForA
        }
    }

    function waitForC(char) {
        if (char === 'c' || char === 'd') {
            endIndex = i
            return end
        } else {
            return waitForA
        }
    }

    function end() {
        return end
    }

    let currentState = waitForA

    for (i = 0; i < string.length; i++) {
        currentState = currentState(string[i])
        if (currentState === end) {
            console.log('start', startIndex)
            console.log('end', endIndex)
            currentState = waitForA
        }
    }
}

console.log(test("wsfgabdgfsabcdweeew"))
