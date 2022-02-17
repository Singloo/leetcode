/**
 * @param {number[][]} grid
 * @return {number}
 */
// https://leetcode-cn.com/problems/number-of-enclaves/
const testCase = require('./testCase.json');
/**
 *
 *
 * @param {number[][]} grid
 * @returns
 * 执行用时：
184 ms
, 在所有 TypeScript 提交中击败了
5.13%
的用户
内存消耗：
53.9 MB
, 在所有 TypeScript 提交中击败了
5.98%
的用户
 */
var numEnclaves = function (grid: number[][]) {
  const cL = grid[0].length;
  const rL = grid.length;
  const count_l = (arr: number[]) => arr.reduce((prev, curr) => prev + curr, 0);
  const getNode = <T>(target: T[][], idx: [number, number]) => {
    try {
      return target[idx[0]][idx[1]];
    } catch (err) {
      console.log(idx);
      process.exit();
    }
  };
  const _visistNode = (idx: [number, number]) => {
    if (getNode(visisted, idx) === true) return;
    visisted[idx[0]][idx[1]] = true;
    if (getNode(grid, idx) === 1) {
      return true;
    }
    return false;
  };
  const _arrPlus = (idx: [number, number], direction: [number, number]) => [
    idx[0] + direction[0],
    idx[1] + direction[1],
  ];
  const _getSiblingNode = (idx: [number, number]) => {
    const res: [number, number][] = [];
    const all = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ].map((c) => _arrPlus(idx, c as [number, number]));
    all.forEach(([c1, c2]) => {
      if (
        c1 < 0 ||
        c1 >= rL ||
        c2 < 0 ||
        c2 >= cL ||
        getNode(visisted, [c1, c2]) ||
        !getNode(grid, [c1, c2])
      )
        return;
      res.push([c1, c2]);
    });
    return res;
  };
  let l: number = grid.reduce((prev, curr) => prev + count_l(curr), 0);
  const l_edge_nodes: [number, number][] = [];
  const visisted: boolean[][] = grid.map((r) => r.map((x) => false));
  // top edge
  console.time('edges');
  for (let i = 0; i < cL; i++) {
    const idx: [number, number] = [0, i];
    const block = getNode(grid, idx);
    if (block === 1) l_edge_nodes.push(idx);
  }
  // left edge
  for (let i = 0; i < rL; i++) {
    const idx: [number, number] = [i, 0];
    const block = getNode(grid, idx);
    if (block === 1) l_edge_nodes.push(idx);
  }
  // right edge
  for (let i = 0; i < rL; i++) {
    const idx: [number, number] = [i, cL - 1];
    const block = getNode(grid, idx);
    if (block === 1) l_edge_nodes.push(idx);
  }
  // bottom edge
  for (let i = 0; i < cL; i++) {
    const idx: [number, number] = [rL - 1, i];
    const block = getNode(grid, idx);
    if (block === 1) l_edge_nodes.push(idx);
  }
  console.timeEnd('edges');
  if (l === 0) return l;
  console.time('bfs');
  const queue: [number, number][] = [];
  let node = l_edge_nodes.shift();
  while (node) {
    const res = _visistNode(node);
    if (res) {
      l--;
      queue.push(..._getSiblingNode(node));
    }
    node = queue.shift() || l_edge_nodes.shift();
  }
  console.timeEnd('bfs');
  console.log(l);
  return l;
};
const grid = testCase;
console.time();
numEnclaves(grid);
console.timeEnd();
