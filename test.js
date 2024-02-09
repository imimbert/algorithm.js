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
console.log("queue_t.swap(queue_t2): \n   queue_t: ",queue_t,"\n   queue_t2: ",queue_t2)