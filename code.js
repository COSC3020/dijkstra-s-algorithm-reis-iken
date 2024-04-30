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
        for (let neighbor in graph[minNode]) {
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
