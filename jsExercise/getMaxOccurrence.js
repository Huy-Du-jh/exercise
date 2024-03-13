const exampleArray = [1, 2, 2, 3, 2, 4, 4, 4, 5, 6];
function getMaxOccurrence(arr) {
  const tempObj = {};
  const result = [];
  let maxOccurrence = 1;
  for (i = 0; i < arr.length; i++) {
    if (tempObj.hasOwnProperty(arr[i])) {
      tempObj[arr[i]] += 1;
      if (maxOccurrence < tempObj[arr[i]]) {
        maxOccurrence = tempObj[arr[i]];
      }
    }
    else {
      tempObj[arr[i]] = 1;
    }
  }
  for (i in tempObj) {
    if (tempObj[i] === maxOccurrence) {
      result.push(i);
    }
  }
  return result;
}
console.log(getMaxOccurrence(exampleArray));