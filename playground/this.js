// setTimeout(function () {
//   console.log(this)
// }, 2000)

// const box = document.querySelector('.box')
// // box.onclick = function () {
// //   console.log(this)
// // }
//
// box.addEventListener('click', function () {
//   console.log(this)
// })

['a','b','c'].forEach(function (item) {
  console.log(item)
  console.log(this)
})
