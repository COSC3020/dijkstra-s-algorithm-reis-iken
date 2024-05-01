const fs = require('fs');
const assert = require('assert');
eval(fs.readFileSync('code.js')+'');

function convertToGraph(adjacencyMatrix) {
    const graph = {};
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        graph[i] = {};
        for (let j = 0; j < adjacencyMatrix[i].length; j++) {
            if (adjacencyMatrix[i][j] !== 0) {
                graph[i][j] = adjacencyMatrix[i][j];
            }
        }
    }
    return graph;
}

let testGraph1 = convertToGraph([[0, 1, 3], [2, 0, 1], [10, 10, 0]]);
let testGraph2 = convertToGraph([[0, 1, 3], [2, 0, 4], [10, 10, 0]]);
let testGraph3 = convertToGraph([[-1, 2, 0], [0, -4, 0], [0, 0, 0]]);
let testGraph4 = convertToGraph([[100, 4, 20], [1, 0, 30], [0, 0, 0]]);

assert(
  JSON.stringify(dijkstra(testGraph1, 0)) === JSON.stringify({ '0': 0, '1': 1, '2': 2 }));
assert(
  JSON.stringify(dijkstra(testGraph2, 0)) === JSON.stringify({ '0': 0, '1': 1, '2': 3 }));
assert(
  dijkstra(testGraph3, 0) == -1);
assert(
  JSON.stringify(dijkstra(testGraph4, 1)) === JSON.stringify({ '0': 1, '1': 0, '2': 21 }));
