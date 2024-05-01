const fs = require('fs');
const assert = require('assert');
eval(fs.readFileSync('code.js')+'');

let testGraph1 = [[0, 1, 3], [2, 0, 1], [10, 10, 0]];
let testGraph2 = [[0, 1, 3], [2, 0, 4], [10, 10, 0]];
let testGraph3 = [[-1, 2, 0], [0, -4, 0], [0, 0, 0]];
let testGraph4 = [[100, 4, 20], [1, 0, 30], [0, 0, 0]];

assert(
  JSON.stringify(dijkstra(testGraph1, 0)) === JSON.stringify([0, 1, 2]));
assert(
  JSON.stringify(dijkstra(testGraph2, 0)) === JSON.stringify([0, 1, 3]));
assert(
  dijkstra(testGraph3, 0) == -1);
assert(
  JSON.stringify(dijkstra(testGraph4, 1)) === JSON.stringify([1, 0, 21]));
