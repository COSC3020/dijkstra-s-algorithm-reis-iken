const fs = require('fs');
const jsc = require('jsverify');
function dijkstra(graph, sourceNode) {
    const distanceResult = {};
    const unvisited = new Set(Object.keys(graph));
    for (const node in graph) {
        distanceResult[node] = node === sourceNode ? 0 : Infinity;
    }
    while (unvisited.size > 0) {
        let minNode = null;
        for (const node of unvisited) {
            if (minNode === null || distanceResult[node] < distanceResult[minNode]) {
                minNode = node;
            }
        }
        if (minNode === null) {
            break;
        }
        unvisited.delete(minNode);
        for (const neighbor of Object.keys(graph[minNode])) {
            if (unvisited.has(neighbor)) {
                const distance = distanceResult[minNode] + graph[minNode][neighbor];
                
                if (distance < distanceResult[neighbor]) {
                    distanceResult[neighbor] = distance;
                }
            }
        }
    }
    
    return distanceResult;
}
const testDijkstra = jsc.forall(jsc.dict(jsc.dict(jsc.integer(1, 1000))), jsc.string, function(graph, sourceNode) {
    const result = dijkstra(graph, sourceNode);
    function checkDistances(distances) {
        for (const node in distances) {
            if (distances[node] === Infinity && node !== sourceNode) {
                return false;
            }
            for (const neighbor in graph[node]) {
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
