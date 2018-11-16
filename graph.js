class Vertex {
    constructor() {
        this.value = 0
        this.adj = []
    }

    add(other) {
        this.adj.push(other)
    }

    add_dir(other) {
        this.add(other)
        other.add(this)
    }
}


class Graph {
    constructor() {
        this.graph = [];
    }

    add_edge(a, b) {
        if(a in graph) graph[a].push(b)
        else {
            graph[a] = new Vertex();
            graph[a].add(b);
        }
    }

    make_dgraph(edges) {
        for(let i  = 0; i < edges.length; i++) {
            this.add_edge(edges[i][0], edges[i][1]);
        }
    }

    make_graph(edges) {
        for(let i  = 0; i < edges.length; i++) {
            this.add_edge(edges[i][0], edges[i][1]);
            this.add_edge(edges[i][1], edges[i][0]);
        }
    }

    make_dense(n, m) {
        let first = [];
        for(let i = 1; i <= n; i++) {
            first.push(new Vertex());
        }
        let second = []
        for(let j = 1; j <= m; j++) {
            second.push(new Vertex());
        }

        for(let i = 0; i < n; i++) {
            for(let j = 0 ; j < m; j++) {
                this.add_edge(first[i], second[j]);
                this.add_edge(second[i], first[i]);
            }
        }
    }
}