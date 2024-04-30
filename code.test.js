let fs = require('fs');
let jsc = require('jsverify');
eval(fs.readFileSync('code.js')+'');
let testDijkstra = jsc.forall(jsc.dict(jsc.dict(jsc.integer)), jsc.string, function(graph, sourceNode) {
    let result = dijkstra(graph, sourceNode);
    function checkDistances(distances) {
        for (let node in distances) {
            if (distances[node] === Infinity && node !== sourceNode) {
                return false;
            }
            for (let neighbor in graph[node]) {
                if (distances[neighbor] > distances[node] + graph[node][neighbor]) {
                    return false;
                }
            }
        }
        return true;
    }
    return checkDistances(result);
});

jsc.assert(testDijkstra);
