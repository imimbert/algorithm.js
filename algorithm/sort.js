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

var arr=[3,4,1,0,-9,2,3,5,6,7,5,4,3,2,5,6,7,9,0,8,11,3545,6,7,67,8,87,5,1,2,3,546,45,43,2,45,7,889,0,86,7,6];
var arr1=[3,4,1,0,-9,2,3,5,6,7,5,4,3,2,5,6,7,9,0,8,11,3545,6,7,67,8,87,5,1,2,3,546,45,43,2,45,7,889,0,86,7,6];
var start = process.hrtime.bigint()
shellSort(arr,1);
var end = process.hrtime.bigint()
console.log('shell sort costs', `${end - start}ns`)
console.log(arr);

var start = process.hrtime.bigint()
quickSort(arr1);
var end = process.hrtime.bigint()
console.log('quick sort costs',`${end - start}ns`)
console.log(arr1)

module.exports=sort;
