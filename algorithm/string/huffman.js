function huffman(str) {
    // 需要编码的字符串
    this.str = str;
    // 键和频率映射表
    this.keyCountMap = null;
    // 编码和键的映射表
    this.codeKeyMap = {};
    // 键和编码的映射表
    this.keyCodeMap = {};   
    // 哈夫曼树节点列表
    this.nodeList = null;
    // 哈夫曼树根节点
    this.root = null;
    // 哈夫曼编码后的01序列
    this.code = null;
}
huffman.prototype.cal =  function cal() {
    str = this.str;
    var map = {};
    var i = 0;
    while(str[i]) {
        map[str[i]] ? map[str[i]]++ : (map[str[i]] = 1);
        i++;
    }
    this.keyCountMap = map;
}

huffman.prototype.sort = function sort() {
    map = this.keyCountMap;
    var result = [];
    for (key in map) {
        if(map.hasOwnProperty(key)) {
            var obj = {
                key: key,
                val: map[key]
            };
            result.push(new Node(null, null, obj));
        }
    }
    this.nodeList = result.sort(function(x,y){return x.data.val > y.data.val});
}
function Node(left, right, data) {
    this.left = left;
    this.right = right;
    this.data = data;
}
huffman.prototype.makeTree = function makeTree() {
    var i = 0;
    var len = this.nodeList.length;
    var node1;
    var node2;
    var parentNode;
    var table = this.nodeList;
    while(table.length > 1) {
        parentNode = new Node(table[i], table[i+1], {key: null, val: table[i]['data'].val + table[i+1]['data'].val});
        table.splice(i,2);
        table.unshift(parentNode);
        table.sort(function(x,y){return x.data.val > y.data.val});
    }
    this.root = table[0] || new Node();
    return this.root;
}

huffman.prototype.traversal = function traversal(tree, code) {
    if (tree.left !== null) {
        traversal.call(this,tree.left, code + '0');
    } else {
        this.keyCodeMap[tree.data.key] = code;
    }
    if (tree.right !== null) {
        traversal.call(this, tree.right,code + '1');
    } else {
        this.keyCodeMap[tree.data.key] = code;
    }

}

huffman.prototype.encode = function encode() {
    this.cal();
    this.sort();
    var root = this.makeTree();
    this.traversal(root, '');
    var ret = this.keyCodeMap;
    var i = 0;
    var result = '';
    var str = this.str;
    while(str[i]) {
        result += ret[str[i++]];
    }
    this.code = result;
    console.log('encode:' + result);
    return result
}
huffman.prototype.reverseMap = function reverseMap() {
    var ret = this.keyCodeMap;
    var result = {};
    for (key in ret) {
        if(ret.hasOwnProperty(key)) {
            result[ret[key]] = key;
        }
    }
    this.codeKeyMap = result;
    return result;
}
huffman.prototype.decode = function decode() {
    var i = 0;
    var result = '';
    var data = '';  
    var map = this.reverseMap();    
    var str = this.code;
    while(str) {
        result += str[i++];
        if (result in map) {
            data += map[result];
            str = str.replace(new RegExp("^"+result),'');
            result = '';
            i = 0;
        }
    }
    console.log("decode:" + data)
}
huffman.prototype.encodeBase64 = function() {
    try {
        var base64 = btoa(this.code);
        return base64;
    } catch(e) {
        return '';
    }
}
module.exports=huffman;