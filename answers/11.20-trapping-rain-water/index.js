/**
 * @param {number[]} height
 * @return {number}
 * https://leetcode-cn.com/problems/trapping-rain-water/
 */
import { height } from './height';
// const height = [0,1,0,2,1,0,1,3,2,1,2,1]
var trap = function() {
  const start = Date.now();
  let num = 0;
  let _height = height.map(o => o);
  let max_height = _height.sort((a, b) => b - a)[0];
  let min_height = _height.sort((a, b) => a - b)[0];
  let matrixs = [];
  for (let i = min_height; i < max_height; i++) {
    const m = height.map(item => (item > i ? 1 : 0));
    matrixs.push(m);
  }
  matrixs.reverse().forEach(matrix => {
    let _indexOf1 = null;
    matrix.forEach((o, i) => {
      if (o == 1) {
        if (_indexOf1 != null) {
          num = num + i - _indexOf1 - 1;
        }
        _indexOf1 = i;
      }
    });
  });
  console.log(num, (Date.now() - start));
  return num;
};

trap();