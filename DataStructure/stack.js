class stack {
    constructor(arr_) {
        this.arr = arr_;
        this.type = "stack";
    }

    empty(){
        if (this.arr.length==0){
            return true; //为空
        }else{
            return false;
        }
    }

    push(item) { //入栈
        this.arr.push(item);
    }

    pop() { // 出栈
        if (this.arr.length === 0) {
            return "The stack is empty!"
        }
        return this.arr.pop()
    }

    clear() { // 清空栈
        this.arr = [];
    }

    top(){ //栈顶元素
        if (this.arr.length!=0){
            return this.arr[0];
        }else{
            return "The stack is empty!"
        }
    }

    emplace(item){ //在最上方插入元素
        this.arr.unshift(item);
    }

    swap(stack2){ //交换
        var _arr;
        _arr = this.arr;
        this.arr=stack2.arr;
        stack2.arr=_arr;
    }

    get size() {
        return this.arr.length;
    }
}
var stack_t = new stack([1,2,3])
var stack_t2 = new stack([1,2,4])
stack_t.push(1);
console.log(stack_t)
console.log(stack_t.top())

stack_t.emplace(4);
console.log(stack_t)

stack_t.pop()
console.log(stack_t)

stack_t.clear()
console.log(stack_t,stack_t.size,stack_t.empty())

stack_t.swap(stack_t2);
console.log(stack_t,stack_t2)