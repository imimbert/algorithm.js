class hash {
    constructor(arrLen) {
        this.arrLen = arrLen;
        this.table = new Array(arrLen);
        this.value = new Array(arrLen);
    }

    //将字符串中每个字符的 ASCII 码值相加
    //散列值是 ASCII 码值的和除以数组长度的余数
    simpleHash(data) {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data.charCodeAt(i);
        }
        return total % this.table.length;
    }

    //霍纳算法
    betterHash(data) {
        const H = 37;
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += H * total + data.charCodeAt(i);
        }
        total = total % this.table.length;
        if (total < 0) {
            total += this.table.length - 1;
        }
        return parseInt(total);
    }

    //开链法
    buildChains() {
        for (let i = 0; i < this.arrLen; i++) {
            this.table[i] = new Array();
            this.value[i] = new Array();
        }
    }

    //显示散列表中的数据
    showDistro(method) {
        if (method == 'chains') {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[i][0] != undefined) {
                    console.log(i + ":" + this.table[i]);
                }
            }
        } else if (method == 'detect') {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[i] != undefined) {
                    console.log(i + ":" + this.table[i]);
                }
            }
        }
    }

    //将数据存入散列表,key-->index
    putWithChains(data, key = undefined) {
        let pos;
        if (key) {
            pos = this.betterHash(key);
            //console.log(pos);
        } else {
            pos = this.betterHash(data);
        }
        let index = 0;
        while (this.value[pos][index] !== undefined) {
            index++;
        }
        this.value[pos][index] = data;
        if(key){
            this.table[pos][index] = key;
        }
    }

    setValue(key, value){
        let pos = this.betterHash(key);
        for(let i=0; i<this.table[pos].length; i++){
            if(this.table[pos][i] == key){
                this.value[pos][i]=value;
            }
        }
    }

    isExist(key){
        let pos = this.betterHash(key);
        for(let i=0; i<this.table[pos].length; i++){
            if(this.table[pos][i]== key){
                return true;
            }
        }
        return false;
    }

    getWithChains(key) {
        let pos = this.betterHash(key);

        for(let i=0; i<this.table[pos].length; i++){
            if(this.table[pos][i] == key){
                return this.value[pos][i];
            }
        }
        return undefined;
    }

    showChains(){
        for(let i=0; i<this.table.length; i++){
            for(let j=0; j<this.table[i].length; j++){
                console.log(this.table[i][j] + '=>' + this.value[i][j]);
            }
        }
    }

    //线性探查法放置数据
    putWithDete(data, key = undefined) {
        let pos;
        if (key) {
            pos = this.betterHash(key);
        } else {
            pos = this.betterHash(data);
        }

        if (this.table[pos] == undefined) {
            this.table[pos] = key;
            this.value[pos] = data;
        } else {
            while (this.table[pos] != undefined) {
                pos++;
            }
            this.table[pos] = key;
            this.value[pos] = data;
        }
    }

    getWithDete(key) {
        let hash = -1;
        hash = this.betterHash(key);
        if (hash > -1) {
            for (let i = hash; this.table[i] != undefined; i++) {
                if (this.table[i] == key) {
                    return this.value[i];
                }
            }
        }
        return undefined;
    }

}

module.exports = hash;

// const HashTable = require('./hash');


