export function insertInSortedArray<T>(
  arr: T[],
  insertElement: T,
  equalityCallback: (a: T, b: T) => 1 | -1 | 0,
  // equalityCallback: if (a > b) => 1, if (a < b) => -1, if (a === b) => 0
): void {
  if (arr.length === 0) {
    arr.push(insertElement);
    return;
  }
  function insert(index: number): void {
    if (index <= 0) {
      arr.unshift(insertElement);
    } else if (index > arr.length - 1) {
      arr.push(insertElement);
    } else {
      arr.splice(index, 0, insertElement);
    }
  }

  function recursive(startIndex: number, endIndex: number): void {
    const middleIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
    const middleElement = arr[middleIndex];

    const comparisonResult = equalityCallback(insertElement, middleElement);
    if (comparisonResult === 0) {
      insert(middleIndex);
      return;
    }
    if (startIndex === endIndex) {
      if (comparisonResult === 1) {
        insert(middleIndex + 1);
      } else {
        insert(middleIndex);
      }
      return;
    }
    if (endIndex - startIndex === 1 && comparisonResult === -1) {
      insert(middleIndex);
      return;
    }
    if (comparisonResult === 1) {
      recursive(middleIndex + 1, endIndex);
    } else {
      recursive(startIndex, middleIndex - 1);
    }
  }
  recursive(0, arr.length - 1);
}
