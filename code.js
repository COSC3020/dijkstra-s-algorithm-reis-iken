function dijkstra(graph, sourceNode) {
    const distanceResult = {};
    const unvisited = new Set(Object.keys(graph));
    for (const node in graph) {
        distanceResult[node] = Infinity;
    }
    distanceResult[sourceNode] = 0;
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
