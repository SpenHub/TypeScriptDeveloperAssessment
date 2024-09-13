export default function addOddNumbersFromList(list: number[]) {
  if (list.length !== 0) {
    let runningSum = 0;
    for (let i of list) {
      // check if integer is odd, easy peasy
      if (_isOdd(i)) {
        // if we're not an integer, it gets fun.
        if (!Number.isInteger(i)) {
          // split the value up and only evaluate the decimal portion
          // there's probably some bitwise operator I could use here but
          // yet again... time constraints.
          let tempI = String(i);
          tempI = tempI.split('.')[1];

          // If the non-integer value (the decimal part of 'i') is even,
          // continue the loop and dont' sum.
          if (!_isOdd(Number(tempI))) {
            continue;
          }
        }
        runningSum += i;
      }
    }
    return runningSum;
  }
  // return undefined for cases where an empty list is returned, this is just to
  // satisfy the default behavior I expect in my test(s)
  return undefined;
}

// Private function to handle the odd check, figured it's slightly better
// for code-readability
function _isOdd(number: number) {
  return number % 2 !== 0;
}
