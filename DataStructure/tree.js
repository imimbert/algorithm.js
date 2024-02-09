class Node{
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
        this.count = 1;
    }

    show(){
        console.log(this.data + "==>" + this.count);
    }
}

class tree {
    constructor() {
        this.root = null;
    }

    // 删除一个节点
    _removeNode(node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            //叶子节点
            if (node.left == null && node.right == null) {
                return null;
            }

            //没有左节点的节点
            if (node.left == null) return node.right;

            //没有右节点的节点
            if (node.right == null) return node.left;


            // 寻找右子树上的最小值
            let tmpNode = this.getMinNode(node.right);
            node.data = tmpNode.data;
            node.right = this._removeNode(node.right, tmpNode.data);
            return node;

        } else if (data < node.data) {
            node.left = this._removeNode(node.left, data);
            return node;
        } else {
            node.right = this._removeNode(node.right, data);
            return node;
        }
    }

    // 删除给定的数据节点
    remove(data) {
        this.root = this._removeNode(this.root, data);
    }

    // 向二叉树中插入节点
    insert(data) {
        // 不能直接用currNode遍历到null，然后将currNode=newNode
        // 这样与原来的数据就没有联系了
        let newNode = new Node(data, null, null);

        if (this.root == null) {
            this.root = newNode;
        } else {
            let currNode = this.root;
            let parentNode = null;

            while (true) {
                parentNode = currNode;

                if (newNode.data < currNode.data) {
                    currNode = currNode.left;

                    if (!currNode) {  // 当前节点为空时，说明找到了正确的插入位置
                        parentNode.left = newNode;
                        break;
                    }
                } else if (newNode.data > currNode.data) {
                    currNode = currNode.right;

                    if (!currNode) {  // // 当前节点为空时，说明找到了正确的插入位置
                        parentNode.right = newNode;
                        break;
                    }
                } else if (newNode.data == currNode.data) {
                    // 如果给定的数据再次出现，就更新计数值
                    currNode.count++;
                    break;
                }
            }
        }
    }

    // 寻找给定数据的节点
    find(data) {
        let currNode = this.root;
        while (currNode) {
            if (currNode.data == data) {
                return currNode;
            } else if (data < currNode.data) {
                currNode = currNode.left;
            } else {
                currNode = currNode.right;
            }
        }
        return null;
    }

    // 获得最小值的节点
    getMinNode(node = this.root) {
        let currNode = node;
        while (currNode.left) {
            currNode = currNode.left;
        }
        return currNode;
    }

    // 获得最大值的节点
    getMaxNode(node = this.root) {
        let currNode = node;
        while (currNode.right) {
            currNode = currNode.right;
        }
        return currNode;
    }

    // 中序递归遍历
    inOrderRec(node = this.root) {
        // 左根右
        // 递归方法遍历二叉树
        let result = '';

        if (node) {
            result += this.inOrderRec(node.left);
            result += `${node.data} `;
            result += this.inOrderRec(node.right);
        }

        return result;
    }

    // 中序非递归遍历
    inOrderNonRec(node = this.root) {
        // 算法需要借助一个栈
        let stack = [];
        let result = '';

        while (node || stack.length) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                result += `${node.data} `;
                node = node.right;
            }
        }

        return result;
    }


    // 前序递归遍历
    preOrderRec(node = this.root) {
        //根左右(递归方法)
        let result = '';

        if (!(node == null)) {
            result += `${node.data} `;
            result += this.preOrderRec(node.left);
            result += this.preOrderRec(node.right);
        }

        return result;
    }

    // 前序遍历非递归方法，算法需要借助一个栈
    preOrderNonRec(node = this.root) {
        let stack = [];  // 算法需要借助一个栈
        let result = '';

        while (node || stack.length) {  // 当节点存在或者栈不空时
            if (node) {
                result += `${node.data} `;  // 访问根节点
                stack.push(node); // 根节点入栈，这是为了到时候能找该节点的右节点
                node = node.left; // 先遍历左子树
            } else {
                node = stack.pop(); // 弹出根节点
                node = node.right; // 遍历根节点的右子树
            }
        }

        return result;
    }


    // 后序遍历递归方法
    postOrderRec(node = this.root) {
        // 左右根(递归的方法)
        let result = '';

        if (!(node == null)) {
            result += this.postOrderRec(node.left);
            result += this.postOrderRec(node.right);
            result += `${node.data} `;
        }

        return result;
    }


    // 后序遍历非递归的方法
    postOrderNonRec(node = this.root) {
        let stack = [];
        let ret = node;
        let result = '';

        while (node || stack.length) { // 栈不空或者node不空时循环
            if (node) {   // 根节点进栈，遍历左子树
                stack.push(node);
                node = node.left; // 找到最左端的节点，路径上的节点全部入栈,包括叶子节点
            } else {
                node = stack[stack.length - 1]; // 获取栈顶节点

                if (node.right && node.right != ret) {  // 如果node有右节点且未访问过
                    node = node.right;
                    stack.push(node);
                    node = node.left; // 再走到最左
                } else {
                    node = stack.pop();
                    result += `${node.data} `;
                    ret = node;
                    node = null;
                }
            }
        }

        return result;
    }

    // 层次遍历
    levelOrder(node = this.root) {
        let queue = [];
        let result = '';

        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            result += `${node.data} `;

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return result;
    }

    // 获得二叉树中节点个数
    // 适用于所有的二叉树
    getNodeNumber(node = this.root) {
        let count = 0;
        if (node) {
            count++; //根结点+1
            count += this.getNodeNumber(node.left); // 加上左子树上结点数
            count += this.getNodeNumber(node.right); // 加上右子树上结点数
        }
        return count;

    }

    // 获得二叉树中边的个数
    // 适用于所有的二叉树
    getEdgeNumber(node = this.root) {
        let edge = 0;

        if (node) {
            let queue = [];
            queue.push(node);

            while (queue.length) {
                node = queue.shift();

                if (node.left) {
                    edge++;
                    queue.push(node.left);
                }
                if (node.right) {
                    edge++;
                    queue.push(node.right);
                }
            }
        }

        return edge;
    }

    // 获得二叉树中叶子节点的个数
    // 适用于所有的二叉树
    getLeafNodeNumber(node = this.root) {
        // 层次遍历

        let count = 0;
        let queue = [];
        if (node) {
            queue.push(node);
            while (queue.length) {
                node = queue.shift();
                if (node.left) {
                    queue.push(node.left);
                }

                if (node.right) {
                    queue.push(node.right);
                }

                if (!node.right && !node.left) {
                    count++;
                }
            }
        }
        return count;
    }


    // 获取二叉树的深度
    // 适用于所有的二叉树
    getTreeDepth(node = this.root) {
        let depth = 0;
        if (node) {
            depth++;
            if (node.left && !node.right) {
                depth = this.getTreeDepth(node.left) + 1;
            }
            if (node.right && !node.left) {
                depth = this.getTreeDepth(node.right) + 1;
            }
            if (node.left && node.right) {
                depth = (this.getTreeDepth(node.left) >
                    this.getTreeDepth(node.right) ?
                    this.getTreeDepth(node.left) : this.getTreeDepth(node.right)) + 1;
            }
        }

        return depth;
    }

    // 获得二叉树的宽度(节点最多的那一层节点个数)
    // 适用于所有的二叉树
    getTreeWidth(node = this.root) {
        let width = 1;
        let queue = [];

        if (node) {
            queue.push(node);

            while (true) {
                let size = queue.length;

                if (size == 0) break;

                while (size) {
                    node = queue.shift();

                    if (node.left) {
                        queue.push(node.left);
                    }
                    if (node.right) {
                        queue.push(node.right);
                    }

                    size--;
                }

                width = queue.length > width ? queue.length : width;
            }
        }

        return width;
    }

    // 获得给定节点所在的层数
    getNodeLevel(data, node = this.root) {
        if (!node) {
            return undefined;
        }
        if (data == node.data) {
            return 1;
        } else if (data < node.data) {
            return this.getNodeLevel(data, node.left) + 1;
        } else if (data > node.data) {
            return this.getNodeLevel(data, node.right) + 1;
        }
    }

    // 计算给定层数节点的个数
    // 适用于所有的二叉树
    getLevelNodeNumber(level, node = this.root) {
        if (node) {
            let depth = 1;
            let queue = [];

            queue.push(node);

            if (depth == level) return queue.length;

            while (true) {
                let size = queue.length; // size保存当前层数节点的个数

                if (size == 0) break;

                while (size) {  // 当前节点全部出队时，队列中保存的就是下一层节点
                    node = queue.shift();

                    if (node.left) {
                        queue.push(node.left);
                    }
                    if (node.right) {
                        queue.push(node.right);
                    }

                    size--;
                }

                depth++;

                if (depth == level) return queue.length;
            }
        }
    }

    // 判断二叉树是不是满二叉树
    // 一颗高度为h，节点数为2^h-1个的二叉树为满二叉树
    isFullTree(node = this.root) {
        let height = this.getTreeDepth(node);
        let nodeNumber = this.getNodeNumber(node);

        return nodeNumber === Math.pow(2, height) - 1;
    }

    isCompleteTree(node = this.root) { // 判断二叉树是不是完全二叉树
        let queue = [];
        let flag = false;
        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            if (node) { // 
                if (flag) {
                    return false;
                }
                // 关键就在于不管node的left和right是否存在依然加入队列
                queue.push(node.left);
                queue.push(node.right);
            } else {
                flag = true;
            }
        }

        return true;
    }

    // 求二叉树的镜像
    invertTree(node = this.root) {
        // 递归的方法
        if (!node) return;

        // 交换当前节点的左右子树
        let tmpNode = node.left;
        node.left = node.right;
        node.right = tmpNode;

        this.invertTree(node.left);
        this.invertTree(node.right);
    }

    isAVLTree(node = this.root) { //是否平衡二叉树
        return this._isAVLTreeChild(node) != -1;
    }

    _isAVLTreeChild(node) {
        if (!node) return 0;

        let left = this._isAVLTreeChild(node.left);
        let right = this._isAVLTreeChild(node.right);

        if (left == -1 || right == -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return Math.max(left, right) + 1;
    }

    // 知道二叉树的先序和中序排列，重建二叉树
    /**
     * @param {Array} preArr 先序序列
     * @param {Array} inArr 中序序列
     * @param {Number} pBeg 先序序列的第一个下标
     * @param {Number} pEnd 先序序列的最后一个下标
     * @param {Number} iBeg 中序序列的第一个下标
     * @param {Number} iEnd 中序序列的最后一个下标
     */
    preInCreate(preArr, inArr, pBeg, pEnd, iBeg, iEnd) {
        let lLen = 0, rLen = 0;
        let splitIdx = -1;
        let node = new Node(preArr[pBeg], null, null); // 建立根节点

        if (!this.root) {
            this.root = node;
        }

        // 利用根节点在中序序列中进行划分
        for (let i = iBeg; i <= iEnd; i++) {
            if (inArr[i] == preArr[pBeg]) {
                splitIdx = i;
                break;
            }
        }

        if (splitIdx > -1) {
            lLen = splitIdx - iBeg; // 左子树的长度
            rLen = iEnd - splitIdx; // 右子树的长度
        }


        if (lLen) { // 递归建立左子树
            node.left = this.preInCreate(preArr, inArr, pBeg + 1,
                pBeg + lLen, iBeg, iBeg + lLen - 1);
        } else {
            node.left = null;
        }

        if (rLen) { // 递归建立右子树
            node.right = this.preInCreate(preArr, inArr, pEnd - rLen + 1,
                pEnd, iEnd - rLen + 1, iEnd);
        } else {
            node.right = null;
        }

        return node;
    }
}

module.exports = tree;


