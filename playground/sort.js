function quickSort(arr) {
  if (arr.length <= 1) return arr
  const left = []
  const right = []
  const current = arr.splice(0, 1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current, quickSort(right))
}

const arr1 = [5,2,8,4,12,67,4,33,5,22,46]

console.log(quickSort(arr1))
