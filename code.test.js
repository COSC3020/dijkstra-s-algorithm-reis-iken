let fs = require('fs');
let jsc = require('jsverify');
eval(fs.readFileSync('code.js')+'');
const testDijkstra = jsc.forall(jsc.dict(jsc.dict(jsc.integer(1, 1000))), jsc.string, function(graph, sourceNode) {
    const result = dijkstra(graph, sourceNode);
    function checkDistances(distances) {
        const visitedNodes = new Set();
        for (const node in distances) {
            if (distances[node] === Infinity) {
                if (node !== sourceNode) {
                    return false;
                }
            } else {
                visitedNodes.add(node);
            }
            for (const neighbor in graph[node]) {
                if (distances[node] !== Infinity && distances[neighbor] > distances[node] + graph[node][neighbor]) {
                    return false;
                }
            }
        }
        return visitedNodes.size === Object.keys(graph).length;
    }
    return checkDistances(result);
});

jsc.assert(testDijkstra);
