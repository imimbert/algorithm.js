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
module.exports = stack;