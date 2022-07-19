var foo = 'old hu'

function foo1() {
  var bb = 'bb xiaozi'
  function bar() {
    console.log(foo)
    console.log(bb)
  }
  return bar
}

const fn = foo1()
fn()
