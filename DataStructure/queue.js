class queue {
    constructor(arr_) {
        this.arr = arr_;
        this.type = "queue";
    }

    empty(){
        if (this.arr.length==0){
            return true; //为空
        }else{
            return false;
        }
    }

    push(item) { //入队列
        this.arr.push(item);
    }

    pop() { // 出队列
        if (this.arr.length === 0) {
            return "The queue is empty!"
        }
        return this.arr.shift()
    }

    front(){ //队列头元素
        if (this.arr.length!=0){
            return this.arr[0];
        }else{
            return "The queue is empty!"
        }
    }

    back(){ //队列尾元素
        if (this.arr.length!=0){
            return this.arr[this.arr.length-1];
        }else{
            return "The queue is empty!"
        }
    }

    swap(queue2){ //交换
        var _arr;
        _arr = this.arr;
        this.arr=queue2.arr;
        queue2.arr=_arr;
    }

    get size() {
        return this.arr.length;
    }
}

module.exports = queue;