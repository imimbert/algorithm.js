const algorm=require("./algorm")

// stack 
var stack_t = new algorm.stack([1,2,3])
var stack_t2 = new algorm.stack([1,2,4])
stack_t.push(1); // 在最后插入
console.log("stcak_t.push(1): ",stack_t)
console.log("stcak_t.top(): ",stack_t.top()) //第一个元素

stack_t.emplace(4); //在最前插入
console.log("stcak_t.emplace(4): ",stack_t)

stack_t.pop() // 弹出最后一个元素
console.log("stack_t.pop(): ",stack_t)

stack_t.clear() //清除
console.log("stack_t.clear(): ",stack_t,"\nstcak_t.size(): ",stack_t.size,"\nstack_t.empty()",stack_t.empty())

stack_t.swap(stack_t2); // 交换
console.log("stack_t.swap(stack_t2): \n  stcak_t: ",stack_t,"\n  stcak_t2: ",stack_t2,"\n\n")

// queue
var queue_t = new algorm.queue([1,2,3])
var queue_t2 = new algorm.queue([1,2,4])

queue_t.push(1); // 在最后插入
console.log("queue_t.push(1): ",queue_t)
console.log("queue_t.front(): ",queue_t.front()) //首个元素
console.log("queue_t.back(): ",queue_t.back()) //末个元素

queue_t.pop() // 弹出第一个元素
console.log("queue_t.pop(): ",queue_t)

console.log("queue_t.size(): ",queue_t.size,"\nqueue_t.empty(): ",queue_t.empty())

queue_t.swap(queue_t2);
console.log("queue_t.swap(queue_t2): \n   queue_t: ",queue_t,"\n   queue_t2: ",queue_t2,"\n\n")

//linkedlist
var linkedlist1 = new algorm.linkedlist()
linkedlist1.append("A")
linkedlist1.append("B")
linkedlist1.append("C")
console.log(".append('A')/'B'/'C' : ",linkedlist1)

console.log("linkedlist1.toString(): ",linkedlist1.toString());

linkedlist1.insert(0, "123");
linkedlist1.insert(2, "456");
console.log(".insert(0,'123')/(2,'456') : ",linkedlist1.toString());

console.log("linkedlist1.getData(0): ",linkedlist1.getData(0));
console.log("linkedlist1.getData(1): ",linkedlist1.getData(1));

linkedlist1.update(0, "12345");
console.log(linkedlist1.toString()); 
linkedlist1.update(1, "54321");
console.log(linkedlist1.toString());

// 测试 removeAt 方法
linkedlist1.removeAt(3);
console.log(linkedlist1.toString());

// 测试 remove 方法
linkedlist1.remove("CC");
console.log(linkedlist1.toString()); 

// 测试 isEmpty 方法
console.log(linkedlist1.isEmpty()); 

// 测试 size 方法
console.log(linkedlist1.size()); 



//doublylinkedlist
const doublyLinkedList = new algorm.doublylinkedlist();

// append() 测试
doublyLinkedList.append("ZZ");
doublyLinkedList.append("XX");
doublyLinkedList.append("CC");
console.log(doublyLinkedList);

// insert() 测试
doublyLinkedList.insert(0, "00");
doublyLinkedList.insert(2, "22");
console.log(doublyLinkedList);

// getData() 测试
console.log(doublyLinkedList.getData(1)); //--> ZZ

// indexOf() 测试
console.log(doublyLinkedList.indexOf("XX")); //--> 3
console.log(doublyLinkedList);

// removeAt() 测试
doublyLinkedList.removeAt(0);
doublyLinkedList.removeAt(1);
console.log(doublyLinkedList);

// update() 测试
doublyLinkedList.update(0, "111111");
console.log(doublyLinkedList);

// remove() 测试
doublyLinkedList.remove("111111");
doublyLinkedList.remove("22222");
console.log(doublyLinkedList);

// forwardToString() 测试
console.log(doublyLinkedList.forwardToString());

// backwardString() 测试
console.log(doublyLinkedList.backwardString(),"\n\n");



//Set
const set = new algorm.set();

// add() 测试
set.add("abc");
set.add("abc");
set.add("123");
set.add("zxc");
console.log(set); //--> {items: {123: "123", abc: "abc", zxc: "zxc"}}

// has() 测试
console.log(set.has("123")); //--> true
console.log(set.has("456")); //--> false

// remove() 测试
set.remove("abc");
console.log(set); //--> {items: {123: "123", zxc: "zxc"}}

// size() 测试
console.log(set.size()); //--> 2

// values() 测试
console.log(set.values()); //--> ["123", "zxc"]

// clear() 测试
set.clear();
console.log(set.values(),"\n\n"); //--> []



// hash
let hTable = new algorm.hash(137);

let someWords = ["detect", "investigate", "scold", "difficulty",
    "complication", "complexity", "intricacy", "detail", "contents"];

let definition = [`discover or identify the presence or existence of.`,
    `carry out a systematic or formal inquiry to discover and examine the 
    facts of (an incident, allegation, etc.) so as to establish the truth.`,
    `remonstrate with or rebuke (someone) angrily.`,
    `the state or condition of being difficult.`,
    `a circumstance that complicates something; a difficulty.`,
    `the state or quality of being intricate or complicated.`,
    `the quality of being intricate.`,
    `an individual feature, fact, or item.`,
    `a state of satisfaction.`];

// 线性探查法
for (let i = 0; i < someWords.length; ++i) {
    hTable.putWithDete(definition[i], someWords[i]);
}

console.log(hTable.getWithDete('detect'));

// 开链法
let chains = new algorm.hash(137);
chains.buildChains();

for(let i=0; i<someWords.length; i++){
    chains.putWithChains(definition[i], someWords[i]);
}

console.log(chains.getWithChains('investigate'),"\n\n");


// tree
let preOrder = [20, 13, 7, 9, 15, 14, 42, 22, 21, 24, 57];
let inOrder = [7, 9, 13, 14, 15, 20, 21, 22, 24, 42, 57];
let inLstIdx = inOrder.length - 1;
let preLstIdx = preOrder.length - 1;

let myTree = new algorm.tree();

myTree.preInCreate(preOrder, inOrder, 0, preLstIdx, 0, inLstIdx);

console.log(myTree.inOrderNonRec());
console.log(myTree.preOrderNonRec());
console.log(myTree.postOrderNonRec());
myTree.remove(20)
console.log(myTree.postOrderNonRec());

console.log(myTree.getMaxNode())
console.log(myTree.getMinNode())
console.log(myTree.isAVLTree())
console.log(myTree.isCompleteTree())
console.log(myTree.isFullTree())
console.log(myTree.getLevelNodeNumber(3))
console.log(myTree.getNodeLevel(7))
console.log(myTree.getTreeWidth())
console.log(myTree.getTreeDepth())
console.log(myTree.getLeafNodeNumber())
console.log(myTree.getEdgeNumber())
console.log(myTree.getNodeNumber())
console.log(myTree.find(7))