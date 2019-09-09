//https://leetcode-cn.com/problems/race-car/

let target = 4;

function main() {
  let min = 0;
  const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  };
  const pow = x => {
    return Math.pow(2, x);
  };
  const sum = n => {
    if (n == 1) {
      return 1;
    }
    return pow(n) - 1;
  };
  const recursion = num => {
    if (num == 1) {
      min = min + 1;
      return;
    }
    let SOE = getBaseLog(2, num + 1);
    let fixedSOE = Math.round(SOE);
    min = min + fixedSOE;
    if (fixedSOE == SOE) {
      return;
    }
    let diff = parseInt(num + 1 - sum(fixedSOE));
    if (diff < 0) {
      min = min + 1;
    } else {
      min = min + 2;
    }
    return recursion(Math.abs(diff));
  };
  recursion(target);
  console.log('min', min);
  return min;
}

main();
