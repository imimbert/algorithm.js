// 边表节点
class Edge {
    constructor(data, weight = 0, nextEdge = null) {
        this.data = data; // 邻接点域
        this.nextEdge = nextEdge; // 指向下一条邻接边
        this.weight = weight;  // 权重
    }
}

// 顶点表节点
class Vertex {
    constructor(data) {
        this.data = data; // 顶点域
        this.firstEdge = null; // 指向第一个邻接边的指针
        this.outNum = 0;  // 在无向图中表示与顶点邻接的边的数量，在有向图中为出度
        this.inNum = 0;  // 在有向图中为顶点的入度
    }
}



