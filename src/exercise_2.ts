export default function addOddNumbersFromList(list: number[]) {
  if (list.length !== 0) {
    let runningSum = 0;
    for (let i of list) {
      // check if integer is odd, easy peasy
      if (_isOdd(i)) {
        runningSum += i;
      }
    }
    return runningSum;
  }
  // return 0 for cases where an empty list is returned, this is just to
  // satisfy the default behavior I expect in my test(s)
  return 0;
}

// Private function to handle the odd check, figured it's slightly better
// for code-readability
function _isOdd(number: number) {
  return Number.isInteger(number) && number % 2 !== 0;
}
