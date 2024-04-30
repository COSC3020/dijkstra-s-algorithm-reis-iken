let fs = require('fs');
let jsc = require('jsverify');

// Dijkstra's algorithm implementation
function dijkstra(graph, sourceNode) {
    let distanceResult = {};
    let unvisited = new Set(Object.keys(graph));
    for (let node in graph) {
        distanceResult[node] = node === sourceNode ? 0 : Infinity;
    }
    while (unvisited.size > 0) {
        let minNode = null;
        for (let node of unvisited) {
            if (minNode === null || distanceResult[node] < distanceResult[minNode]) {
                minNode = node;
            }
        }
        if (minNode === null) {
            break;
        }
        unvisited.delete(minNode);
        for (let neighbor of Object.keys(graph[minNode])) {
            if (unvisited.has(neighbor)) {
                let distance = distanceResult[minNode] + graph[minNode][neighbor];
                if (distance < distanceResult[neighbor]) {
                    distanceResult[neighbor] = distance;
                }
            }
        }
    }
    return distanceResult;
}

// Property-based test for Dijkstra's algorithm
let testDijkstra = jsc.forall(jsc.dict(jsc.dict(jsc.integer(1, 1000))), jsc.string, function(graph, sourceNode) {
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

// Run the property-based test
jsc.assert(testDijkstra);
