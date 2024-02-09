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

class Graph {
    constructor(isDirect) { // 有向图/无向图  1有 0无
        this.eNum = 0;  // 边的数目
        this.adj = [];  // 顶点表
        this.isDirect = isDirect; // 是否是有向图
    }

    // 初始化顶点表
    initVertex(verArr) {
        for (let i = 0; i < verArr.length; i++) {
            let newVer = new Vertex(verArr[i]);
            this.adj[i] = newVer;
        }
    }

    // 插入新的顶点
    insertVertex(x) {
        let newVer = new Vertex(x);
        this.adj.push(newVer);
    }

    // 找到节点x在adj中所在的位置
    // 前面加上下划线表示不应该在具体实例中调用该方法
    _find(x) {
        let pos = -1;

        for (let i = 0; i < this.adj.length; i++) {
            if (x == this.adj[i].data) pos = i;
        }

        return pos;
    }

    // 与顶点x邻接的所有节点
    allNeightbors(x) {
        let pos = this._find(x);

        if (pos > -1) {
            let result = `${x}`;
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                result += `=>${curVer.data}`;
                curVer = curVer.nextEdge;
            }

            console.log(result);
        }
    }

    /**
     * 判断是否存在边(x,y)或者<x, y>。
     * 在无向图中只要存在边(x, y)即存在边(y, x);
     * @param {顶点x} x 
     * @param {顶点y} y 
     */
    hasEdge(x, y) {
        let pos = this._find(x);

        if (pos > -1) {
            let curVer = this.adj[pos].firstEdge;

            if (!curVer) {  // 没有与顶点x的邻接点
                return false;
            } else {  // 至少有一个节点与顶点x是相邻的
                // 遍历顶点的所有邻接节点
                while (curVer) {
                    if (curVer.data === y) return true;

                    curVer = curVer.nextEdge;
                }

                return false;
            }
        }
    }

    // 获取图中所有的边
    getAllEdges() {
        let vertex = this.adj;
        let edges = [];  // 在edges中存放图中所有的边

        if (!this.isDirect) {  // 如果是无向图
            for (let i = 0; i < vertex.length - 1; i++) {
                for (let j = i; j < vertex.length; j++) {
                    if (this.hasEdge(vertex[i].data, vertex[j].data)) {
                        let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);
                        edges.push([vertex[i].data, vertex[j].data, weight]);
                    }
                }
            }
        } else {
            for (let i = 0; i < vertex.length; i++) {
                for (let j = 0; j < vertex.length; j++) {
                    if (this.hasEdge(vertex[i].data, vertex[j].data)) {
                        let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);
                        edges.push([vertex[i].data, vertex[j].data, weight]);
                    }
                }
            }
        }

        return edges;
    }

    /**
     * 获取边(x, y)或<x, y>对应的权值
     * @param {*} x 
     * @param {*} y 
     */
    getEdgeWeight(x, y) {
        let pos = this._find(x);

        if (pos > -1) {
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                if (curVer.data === y) { return curVer.weight; }

                curVer = curVer.nextEdge;
            }

            return 0;
        }
    }

    // 获得图中最大的权值
    getMaxEdgeWeight() {
        let maxWieght = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < this.adj.length; i++) {
            let curVer = this.adj[i].firstEdge;

            while (curVer) {
                if (maxWieght < curVer.weight) {
                    maxWieght = curVer.weight;
                }

                curVer = curVer.nextEdge;
            }
        }

        return maxWieght;
    }

    // 获得图中最小的权值
    getMinEdgeWeight() {
        let minWeight = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < this.adj.length; i++) {
            let curVer = this.adj[i].firstEdge;

            while (curVer) {
                if (minWeight > curVer.weight) {
                    minWeight = curVer.weight;
                }

                curVer = curVer.nextEdge;
            }
        }

        return minWeight;
    }

    // 获得图中权重之和
    getSumOfWeight() {
        // 当图不是连通的时候，获取权重之和没有意义
        if (!this.isConnected()) return;

        let sum = 0;
        let vertex = this.adj;

        if (!this.isDirect) {  // 如果是无向图
            for (let i = 0; i < vertex.length - 1; i++) {
                for (let j = i; j < vertex.length; j++) {
                    let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);

                    if (weight) sum += weight;
                }
            }
        } else {
            for (let i = 0; i < vertex.length; i++) {
                for (let j = 0; j < vertex.length; j++) {
                    let weight = this.getEdgeWeight(vertex[i].data, vertex[j].data);

                    if (weight) sum += weight;
                }
            }
        }

        return sum;
    }

    /**
     * 设置边(x, y)或<x, y>的权值
     * @param {*} x 
     * @param {*} y 
     * @param {Number} w 
     */
    setEdgeWeight(x, y, w) {
        let pos = this._find(x);

        if (pos > -1) {
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                if (curVer.data === y) {
                    curVer.weight = w;
                }

                curVer = curVer.nextEdge;
            }
        }
    }

    /**
     * 
     * @param {Number, String} x 
     * @param {Number, String} y 
     * @param {Number} w 
     */
    addEdge(x, y, w = 0) {  // 向图中插入边(x, y)
        let posX = this._find(x);
        let posY = this._find(y);
        let newEdgeX = new Edge(x, w);
        let newEdgeY = new Edge(y, w);

        // 如果是无向图，在插入边(x, y)时还要插入边(y, x)
        if (!this.isDirect) {
            if (!this.hasEdge(x, y) && !this.hasEdge(y, x)) {
                if (posX > -1) {  // 如果顶点x在顶点表中
                    let curVer = this.adj[posX].firstEdge;

                    if (!curVer) { // 如果当前顶点没有第一个边节点
                        this.adj[posX].firstEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    } else {
                        let len = this.adj[posX].outNum - 1;

                        while (len--) {
                            curVer = curVer.nextEdge;
                        }

                        curVer.nextEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    }
                }

                if (posY > -1) {  // 如果顶点y在顶点表中
                    let curVer = this.adj[posY].firstEdge;

                    if (!curVer) { // 如果当前顶点没有第一个边节点
                        this.adj[posY].firstEdge = newEdgeX;
                        this.adj[posY].outNum++;
                    } else {
                        let len = this.adj[posY].outNum - 1;

                        while (len--) {
                            curVer = curVer.nextEdge;
                        }

                        curVer.nextEdge = newEdgeX;
                        this.adj[posY].outNum++;
                    }
                }

                this.eNum++;
            }
        }

        // 如果是有向图则只需要插入边<x, y>即可
        else {
            if (!this.hasEdge(x, y)) {
                if (posX > -1) {  // 如果顶点x在顶点表中
                    let curVer = this.adj[posX].firstEdge;

                    if (!curVer) { // 如果当前顶点没有第一个边节点
                        this.adj[posX].firstEdge = newEdgeY;
                        this.adj[posX].outNum++;
                    } else {
                        let len = this.adj[posX].outNum - 1;

                        while (len--) {
                            curVer = curVer.nextEdge;
                        }

                        curVer.nextEdge = newEdgeY;
                        this.adj[posX].outNum++;  // 顶点x的出度增长
                    }

                    this.eNum++;
                }

                if (posY > -1) {
                    let curVer = this.adj[posY];
                    curVer.inNum++;  // 顶点y的入度增长
                }
            }
        }
    }

    /**
     * 由于是由邻接表表示的数据结构，当删除边(x, y)时也需要同时删除边(y, x);
     * @param {String, Number} x 
     * @param {String, Number} y 
     */
    removeEdge(x, y) {  // 在图中删除边(x, y)
        if (this.hasEdge(x, y)) {
            let posX = this._find(x);
            let posY = this._find(y);
            let curVerX = this.adj[posX].firstEdge;
            let curVerY = this.adj[posY].firstEdge;

            // 如果是无向图，当删除边(x, y)时也需要同时删除边(y, x);
            if (!this.isDirect) {
                // 删除边(x, y)
                if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posX].firstEdge = curVerX.nextEdge;
                    this.adj[posX].outNum--;
                    curVerX = null;
                }

                // curVerX如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerX) {
                    let preVerX = curVerX;
                    curVerX = curVerX.nextEdge;

                    if (curVerX && curVerX.data === y) {
                        preVerX.nextEdge = curVerX.nextEdge;
                        this.adj[posX].outNum--;
                        curVerX = null;
                    }
                }

                // 删除边(y, x)
                if (curVerY.data === x) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posY].firstEdge = curVerY.nextEdge;
                    this.adj[posY].outNum--;
                    curVerY = null;
                }

                // curVerY如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerY) {
                    let preVerY = curVerY;
                    curVerY = curVerY.nextEdge;

                    if (curVerY && curVerY.data === x) {
                        preVerY.nextEdge = curVerY.nextEdge;
                        this.adj[posY].outNum--;
                        curVerY = null;
                    }
                }
            } else {
                // 删除边<x, y>
                if (curVerX.data === y) { // 如果顶点的第一个节点即是要找的节点
                    this.adj[posX].firstEdge = curVerX.nextEdge;
                    this.adj[posX].outNum--;
                    curVerX = null;
                }

                // curVerX如果存在，说明要找的节点不是顶点的第一个节点
                while (curVerX) {
                    let preVerX = curVerX;
                    curVerX = curVerX.nextEdge;

                    if (curVerx && curVerX.data === y) {
                        preVerX.nextEdge = curVerX.nextEdge;
                        this.adj[posX].outNum--;
                        curVerX = null;
                    }
                }

                this.adj[posY].inNum--;
            }

            this.eNum--;
        }
    }


    // 从图中删除顶点x
    deleteVertex(x) {
        let pos = this._find(x);

        if (pos > -1) {
            // 删除从x出发的边
            let curVer = this.adj[pos].firstEdge;

            while (curVer) {
                this.removeEdge(x, curVer.data);
                curVer = curVer.nextEdge;
            }

            // 删除终点是x的边
            for (let i = 0; i < this.adj.length; i++) {
                let temVer = this.adj[i].firstEdge;

                while (temVer) {
                    if (temVer.data === x) {
                        this.removeEdge(this.adj[i].data, temVer.data);
                    }

                    temVer = temVer.nextEdge;
                }
            }

            // 删除顶点x
            this.adj.splice(pos, 1);
        }
    }

    /**
     * 广度优先遍历:
     * 首先访问起始顶点v，接着由v出发，依次访问v的各个未访问过的邻接顶点w1，w2，……，
     * 然后再依次访问w1，w2，……，wi的所有未被访问过的邻接顶点；再从这些访问过的顶点
     * 出发，再访问他们所有未被访问过的邻接顶点，依次类推，直到所有的顶点都被访问过。
     * 如果无向图是连通的，则从给定的顶点出发，仅需一次遍历就能够访问图中所有的顶点，
     * 如果无向图是非连通的，则给定的顶点出发，一次遍历只能访问到该顶点所在的连通分量
     * 的所有顶点，而对于图中其他连通分量的顶点，则无法通过这次遍历访问。对于有向图来
     * 说，如果从初始点到图中的每个顶点都有路径，则能够访问到图中所有的顶点，否则不能
     * 访问到所有的顶点。
     * @param {*} x 
     */
    BFSTraverse(x = this.adj[0].data) {  // x为广度优先遍历的起始顶点
        let visited = [];  // 访问标记数组，标记数组和顶点表唯一的联系就是下标
        let result = '';

        for (let i = 0; i < this.adj.length; i++) {
            visited[i] = false;
        }

        result = this._BFS(x, visited);

        // 如果还有未被访问过的顶点，则以该顶点再次出发
        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                let x = this.adj[i].data;
                result += `&${this._BFS(x, visited)}`;  // 其他的连通分量
            }
        }

        return result;
    }


    // 实际进行广度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
    _BFS(x, visited) {
        let result = '';
        let queue = [];  // 辅助队列
        let pos = this._find(x);  // 找到顶点x在顶点表中的位置

        if (pos > -1) {
            result += `${x}`;
            visited[pos] = true;  // 在标记数组相应的位置上做已访问标识

            let curVer = this.adj[pos];  // 当前顶点
            queue.push(curVer);  // 顶点x入队列

            while (queue.length) {
                curVer = queue.shift();  // 取出一个顶点
                // 注意要回到顶点的表中再次出发
                pos = this._find(curVer.data);
                curVer = this.adj[pos].firstEdge;

                while (curVer) {  // 检测顶点的所有邻接点
                    pos = this._find(curVer.data);

                    if (!visited[pos]) {
                        result += `->${curVer.data}`;
                        visited[pos] = true;  // 做已访问标识
                        queue.push(curVer);
                    }

                    curVer = curVer.nextEdge;
                }
            }
        }

        return result;
    }

    /**
     * 深度优先遍历：
     * 首先访问图中某一个起始顶点x，然后由x出发，访问与x邻接且未被访问的任一个顶点w1，
     * 再访问与w1邻接的未被访问的任一个顶点w2，重复这个过程，当不能再继续向下访问时，
     * 依次退回到最近被访问的顶点，若它还有邻接顶点未被访问过，则从该点开始继续上述搜
     * 索过程，直到图中所有的顶点都被访问过为止。与广度遍历一样，从某个给定顶点开始，
     * 如果无向图是连通的，则这个给定的顶点出发，仅需一次遍历就能够访问图中所有的顶点，
     * 如果无向图是非连通的，则从这个顶点出发，一次遍历只能访问到该顶点所在的连通分量
     * 的所有顶点，而对于图中其他连通分量的顶点，则无法通过这次遍历访问。对于有向图来
     * 说，如果从初始点到图中的每个顶点都有路径，则能够访问到图中所有的顶点，否则不能
     * 访问到所有的顶点。
     * @param {给定的起始顶点x} x 
     */
    DFSTraverse(x = this.adj[0].data) {
        let result = '';
        let visited = [];  // 标记数组

        for (let i = 0; i < this.adj.length; i++) {
            visited[i] = false;
        }

        result = this._DFS(x, visited);

        // 如果还有未被访问过的顶点，则以该顶点再次出发
        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                let x = this.adj[i].data;
                result += `&${this._DFS(x, visited)}`;
            }
        }

        return result;
    }


    // 实际进行深度遍历的函数，每次遍历都是得到一个以顶点x为起点的连通分量
    _DFS(x, visited) {
        let result = '';
        let stack = [];  // 辅助堆栈
        let pos = this._find(x);
        let curVer = this.adj[pos];  // 根据给的x值找到具体的顶点

        if (pos > -1) {
            stack.push(curVer);  // 顶点x入栈
            result += `${x}`;
            visited[pos] = true;

            while (stack.length) {
                curVer = stack[stack.length - 1];  // 获取栈顶元素
                pos = this._find(curVer.data);  // 获取栈顶元素在顶点表中的位置
                curVer = this.adj[pos].firstEdge;  // 获取顶点的第一个邻接点

                while (curVer) {
                    pos = this._find(curVer.data);

                    if (visited[pos]) {  // 如果该节点已经访问过了,则访问该节点的下一个相邻的节点
                        curVer = curVer.nextEdge;
                    } else {
                        stack.push(curVer);
                        result += `->${curVer.data}`;
                        visited[pos] = true;
                        break;
                    }
                }

                if (!curVer) stack.pop();// 如果顶点的所有邻接点都访问过
            }
        }

        return result;
    }


    // 判断当前的图是否是连通图
    isConnected(x = this.adj[0].data) {
        // 任选一个顶点作为起点
        let len = this.adj.length;
        let visited = new Array(len);

        for (let i = 0; i < len; i++) {
            visited[i] = false;
        }

        this._BFS(x, visited);

        // 如果遍历一边之后仍有顶点未被访问，则该图不是连通的
        for (let i = 0; i < len; i++) {
            if (!visited[i]) return false;
        }

        return true;
    }

    /**
     * 最小生成树：
     * 一个连通图的生成树是图的极小连通子图，它包含了图中所有的顶点，并且只含
     * 尽可能少的边。这意味着对于生成树来说，若砍去它的一条边，就会使生成树变
     * 成非连通图；若给它增加一条边，就会形成图中的一条回路。
     * 对于带权的连通无向图，生成树不同，每棵树的权重也可能不同，最小生成树就
     * 是权重最小的那颗树。
     * @param {String} method 
     */
    // 普里姆算法
    getPrimMST() {
        // 不是连通图时求最小生成树没有意义
        if (!this.isConnected()) { return; }

        let V = this.adj;  // 顶点集V
        let Vt = [V[0]];  // 添加任意一个顶点
        let VVt = V.filter(x => Vt.indexOf(x) === -1); // VVt = V - Vt
        let MSTree = new Graph(this.isDirect);  // 初始化空树
        V.forEach(x => MSTree.insertVertex(x.data));  // 图方便先将所有顶点都放入树中

        while (Vt.length !== V.length) {  // 若树中不含全部顶点
            let mVt = null;  // 当找到权值最小的边时，mVT是边的一个顶点
            let mVVt = null;  // 当找到权值最小的边时，mV_VT是边的另一个顶点
            let minW = Number.MAX_SAFE_INTEGER;  // 先将minW赋个极大的数值

            // 在VT和V_VT中找到边中的最小权值
            for (let i = 0; i < Vt.length; i++) {  // 从VT中取出一个顶点
                for (let j = 0; j < VVt.length; j++) {  // 从VVt中取出一个顶点
                    let weight = this.getEdgeWeight(Vt[i].data, VVt[j].data);

                    if (weight && minW > weight) {
                        minW = weight;
                        mVt = Vt[i];
                        mVVt = VVt[j];
                    }
                }
            }

            Vt.push(mVVt);
            MSTree.addEdge(mVt.data, mVVt.data, minW);
            VVt = V.filter(x => Vt.indexOf(x) === -1);
        }

        return MSTree;
    }

    // 克鲁斯卡尔算法
    // 算法的基本思想是先找权重最小的边，再找权重次小的边，直到出现回路
    getKruskalMST() {
        // 不是连通图时求最小生成树没有意义
        if (!this.isConnected()) { return; }

        let V = this.adj;  // 顶点集V
        let numS = V.length;  // 树中的连通分量
        let E = this.getAllEdges();  // 在E中存放图中所有的边
        let mEdge = null;

        let MSTree = new Graph(this.isDirect);  // 初始化空树
        V.forEach(x => MSTree.insertVertex(x.data));  // 树中只有顶点

        while (numS > 1) {
            let mWeight = Number.MAX_SAFE_INTEGER;

            // 从图中取出权值最小的边(u, v);
            for (let i = 0; i < E.length; i++) {
                if (E[i][2] < mWeight) {
                    mEdge = E[i];
                    mWeight = mEdge[2];
                }
            }

            let result = MSTree.BFSTraverse(mEdge[0]);
            result = result.split('&')[0];  // 只取&前面的字符串
            let pos = result.indexOf(mEdge[1]);

            // 如果v和u属于树中不同的连通分量，就将此边加入生成树中
            // 从顶点mEdge[0]遍历一遍发现没有mEdge[1]，说明两个顶点不在一个连通分量之中
            if (pos === -1) {
                MSTree.addEdge(mEdge[0], mEdge[1], mEdge[2]);
                numS--;
            }

            E = E.filter(x => x !== mEdge);  // 去掉E中权值最小的边
        }

        return MSTree;
    }

    /**
     * 求带权图顶点x到其他顶点的最短路径
     * 从x到y可能有多条路径，把带权路径长度最短的那条路径称为最短路径
     * 求解最短路径的算法通常都依懒于一种性质，
     * 也就是两点之间的最短路径也包含了路径上的其他顶点间的最短路径
     * @param {顶点x} x 
     */
    getShortestPath(x) {
        // 使用Dijkstra算法，
        // 如果是无向图或者边有负的权值时退出
        // 如果x不存在于图中时退出
        // 如果从顶点x到不了图中任意一个顶点则退出
        if (!this.isDirect
            || this.getMinEdgeWeight() < 0
            || this._find(x) === -1
            || !this.isConnected(x)) { return -1; }

        var MAX = Number.MAX_SAFE_INTEGER;

        // 初始化
        var len = this.adj.length;

        // 在dist数组中，dist[i]的初值为顶点x到顶点i之间的权值，
        // x到i没有路径时，dist[i]记为无穷大
        var dist = [];
        var path = [];  // path[i]表示顶点x到i的最短路径
        var vers = [];  // 顶点集
        var exts = [x];  // 已找到最短路径的点的集合

        // 初始化path和dist数组
        for (let i = 0; i < len; i++) {
            vers[i] = this.adj[i].data;
            dist[i] = this.getEdgeWeight(x, vers[i]) || MAX;
            if (dist[i] !== MAX) {
                path[i] = `${x}->${vers[i]}`;
            } else {
                path[i] = '';
            }
        }

        var rem = vers.filter(x => exts.indexOf(x) === -1);  // 剩余的顶点
        var n = 1;

        while (n < len) {
            // 在dist中寻找最小值
            var min = MAX;
            var idx = -1;

            for (let i = 0; i < len; i++) {
                if (min > dist[i]) {
                    min = dist[i];
                    idx = i;
                }
            }

            var Vj = vers[idx];  // 直接找到Vj
            dist[idx] = MAX;
            exts.push(Vj);
            rem = vers.filter(x => exts.indexOf(x) === -1);

            console.log(path[idx]);  // 输出最短路径

            // 松弛工作
            for (let i = 0; i < rem.length; i++) {
                // Vj到其他节点的距离
                var w = this.getEdgeWeight(Vj, rem[i]) || MAX;
                var k = vers.indexOf(rem[i]);

                if (w + min < dist[k]) {
                    dist[k] = w + min;
                    path[k] = `${path[idx]}->${rem[i]}`;
                }
            }

            n++;
        }
    }


    // 拓扑排序
    /**
     * 拓扑排序是指在图论中，由一个有向无环图的顶点组成的序列，当且仅当满足下列条件时
     * 成为该图的一个拓扑序列
     * 1、每个顶点只出现一次
     * 2、若顶点A在序列中排在顶点B之前，则在图中不存在从顶点B到顶点A的路径。
     * 算法的基本思想：
     * 1、在图中选择一个没有前驱顶点并输出
     * 2、从图中删除该顶点和所有以它为起点的有向边
     * 3、重复1,2步直到图为空，或当前图中不存在无前驱节点的顶点。后一种情况说明图中存在环
     * 注意：使用这个方法后会将建立好的图进行肢解。
     */
    getTopoSort() {
        if (!this.isDirect) {  // 如果是无向图则返回
            return;
        }

        // 为了不将原来的图肢解掉，重建一个一样的图；
        let vers = this.adj;
        let tpTree = new Graph(this.isDirect);
        vers.forEach(x => tpTree.insertVertex(x.data));

        for (let i = 0; i < vers.length; i++) {
            let x = vers[i].data;

            for (let j = 0; j < vers.length; j++) {
                let y = vers[j].data;

                if (this.hasEdge(x, y)) {
                    let w = this.getEdgeWeight(x, y);
                    tpTree.addEdge(x, y, w);
                }
            }
        }

        let result = [];
        vers = tpTree.adj;

        // 寻找入度为0的顶点
        while (true) {
            let flag = false;

            for (let i = 0; i < vers.length; i++) {
                if (vers[i].inNum === 0) {
                    flag = true;  // 只要有顶点的入度为0,flag就为真
                    result.push(vers[i].data);
                    tpTree.deleteVertex(vers[i].data);
                }
            }

            if (!flag) break;  // 没有顶点的入度为0
        }

        return result;
    }

    // 关键路径
    /**
     * 在AOE网中，从源点到汇点的所有路径中，具有最大路径长度的路径称为关键路径。
     * 所谓的AOE网是指：
     * 1、只有在某顶点代表的事件发生后，从该顶点出发的各有向边代表的活动才能开始。
     * 2、只有在进入某顶点的各有向边代表的活动都已经结束时，该顶点代表的事件才能发生。
     */
    getCriticalPath() {
        if (!this.isDirect ||
            !this.isConnected()) return;  // 如果是无向图或者图不是连通的则退出

        // 在AOE网中只能有一个入度为0的顶点，只能有一个出度为0的点
        let vers = this.adj;
        let inNum = 0;  // 入度为0的顶点的个数
        let outNum = 0;  // 出度为0的顶点的个数
        for (let i = 0; i < vers.length; i++) {
            if (vers[i].inNum === 0) inNum++;
            if (vers[i].outNum === 0) outNum++;
        }

        if (inNum === 1 && outNum === 1) {
            let tpSort = this.getTopoSort();  // 获得顶点的拓扑排列
            let ve = new Array(vers.length);  // 顶点最早开始时间
            let vl = new Array(vers.length);  // 顶点的最晚开始时间

            // 求得ve数组
            ve[0] = 0;
            for (let i = 1; i < tpSort.length; i++) {
                let allWeight = [];

                // 向前寻找是否有边
                for (let j = 0; j < i; j++) {
                    if (this.hasEdge(tpSort[j], tpSort[i])) {
                        let w = this.getEdgeWeight(tpSort[j], tpSort[i]);
                        allWeight.push(ve[j] + w);
                    }
                }

                ve[i] = Math.max(...allWeight);
            }

            //求得vl数组
            vl[vl.length - 1] = ve[ve.length - 1];
            for (let i = tpSort.length - 2; i >= 0; i--) {
                let allWeight = [];

                // 向后寻找是否有边
                for (let j = i + 1; j < tpSort.length; j++) {
                    if (this.hasEdge(tpSort[i], tpSort[j])) {
                        let w = this.getEdgeWeight(tpSort[i], tpSort[j]);
                        allWeight.push(vl[j] - w);
                    }
                }

                vl[i] = Math.min(...allWeight);
            }

            console.log(ve);
            console.log(vl);

            let result = [];
            for (let i = 0; i < ve.length; i++) {
                if (ve[i] === vl[i]) {
                    result.push(tpSort[i]);
                }
            }

            console.log(result);
        }
    }
}

module.exports=Graph;

var arr = ['A', 'B', 'C', 'D', 'E'];
var myGraph = new Graph(1);  // 0表示无向图
myGraph.initVertex(arr);

myGraph.addEdge('A', 'B', 10);
myGraph.addEdge('A', 'C', 3);
myGraph.addEdge('B', 'C', 1);
myGraph.addEdge('B', 'D', 2);
myGraph.addEdge('C', 'B', 4);
myGraph.addEdge('C', 'D', 8);
myGraph.addEdge('C', 'E', 2);
myGraph.addEdge('D', 'E', 7);
myGraph.addEdge('E', 'D', 9);

console.log(myGraph.getShortestPath('B'));
console.log(myGraph)

console.log(myGraph.allNeightbors('A'))







