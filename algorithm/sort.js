sort={};
sort.shellSort=shellSort;
sort.quickSort=quickSort;
function shellSort(arr,way=0){ //way   0升序   1降序
    for(let gap = parseInt(arr.length/2);gap>0;gap = parseInt(gap/2)){
        for(let i=gap;i<arr.length;i++){
            let j=i;
            let empty = arr[j]
            while(j - gap>=0 &&empty <arr[j - gap]){
                arr[j] =arr[j-gap];
                j -= gap;
            }
            arr[j] = empty;
        }
    }
    if (way==1){
        arr.reverse();
    }
}

function partition(arr, start, end){
    // 以最后一个元素为基准
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
        // 交换元素
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // 移动到下一个元素
        pivotIndex++;
        }
    }
    
    // 把基准值放在中间
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    return pivotIndex;
};

function quickSort(arr, start=0, end=arr.length-1,way=0) {
    // 终止条件
    if (start >= end) {
        if(way==1){
            arr.reverse();
        }
        return;
    }
    
    // 返回 pivotIndex
    let index = partition(arr, start, end);
    
    // 将相同的逻辑递归地用于左右子数组
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

module.exports=sort;
