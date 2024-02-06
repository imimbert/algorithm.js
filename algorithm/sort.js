sort={};
sort.shellSort=shellSort;
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

var arr=[3,4,1,0,-9];
shellSort(arr,1);
console.log(arr);

module.exports=sort;
