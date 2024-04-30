function dijkstra(graph, sourceNode) {
    let distanceResult = {};
    let unvisited = new Set(Object.keys(graph));
    for (let node in graph) {
        distanceResult[node] = Infinity;
    }
    distanceResult[sourceNode] = 0;
    while (unvisited.size > 0) {
        let minNode = null;
        for (let node of unvisited) {
            if (minNode === null || distanceResult[node] < distanceResult[minNode]) {
                minNode = node;
            }
        }
        if (minNode === null) {
            break; }
        visited[minNode] = true;
        unvisited.delete(minNode);
        for (let neighbor in graph[minNode]) {
            let distance = distanceResult[minNode] + graph[minNode][neighbor];
            if (distance < distanceResult[neighbor]) {
                distanceResult[neighbor] = distance;
            }
        }
    }
    return distanceResult;
