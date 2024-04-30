function dijkstra(graph, sourceNode) {
    let dist = {};
    let pq = new PriorityQueue();
    for (let vertex in graph) {
        dist[vertex] = vertex === sourceNode ? 0 : Infinity;
        pq.enqueue(vertex, dist[vertex]);
    }
    while (!pq.isEmpty()) {
        let u = pq.dequeue();
        for (let neighbor in graph[u]) {
            let alt = dist[u] + graph[u][neighbor];
            if (alt < dist[neighbor]) {
                dist[neighbor] = alt;
                pq.enqueue(neighbor, alt);
            }
        }
    }
    return dist;
}
