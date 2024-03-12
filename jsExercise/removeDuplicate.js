const exampleArray = [1, 2, 2, 3, 4, 4, 4, 5, 6];
function useSet(arr) {
  const newSet = Set(exampleArray);
  return [...newSet];
}

function useObject(arr) {
  const newObj = {};
  const result = [];
  for (i = 0; i < arr.length; i++) {
    if (newObj[arr[i]]) {
      continue;
    }
    else {
      newObj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
}
function useArray(arr) {
  const result = [];
  for (i = 0; i < arr.length; i++) {
    if (result.includes(arr[i])) {
      continue;
    }
    else {
      result.push(arr[i]);
    }
  }
}