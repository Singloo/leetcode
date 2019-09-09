function getIntersection(arr) {
    const fillArray = arr1 => {
      if (arr1.length === 0 || arr1.length === 1) return arr1;
      const _arr = [];
      for (let i = Math.min(...arr1); i <= Math.max(...arr1); i++) {
        _arr.push(i);
      }
      return _arr;
    };
    const crossed = (arr1, arr2) => {
      const _arr = [];
      if (!arr1.length || !arr2.length) return [];
      for (let i of arr1) {
        if (arr2.includes(i)) _arr.push(i);
      }
      return _arr;
    };
    const fixed = arr.map(fillArray);
    const result = fixed.reduce((acc, curr) => {
      return crossed(acc, curr);
    });
    //   console.log(result);
    if (!result.length) return null;
    if (result.length === 1) return result;
    return [Math.min(...result), Math.max(...result)];
  }
  
  console.log(getIntersection([[5, 2], [4, 9], [3, 6]]));
  console.log(getIntersection([[1, 7], [8, 9]]));
  