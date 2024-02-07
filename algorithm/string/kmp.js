function kmp(strs1, strs2) {
    if (strs1 === strs2 || !strs2) return 0;
    const sLen = strs1.length,
        tLen = strs2.length;
    const next = Array(tLen);
    next[0] = 0;
    let matchLen = 0;
    for (let curIndex = 1; curIndex < tLen; curIndex++) {
        while (matchLen && strs2[curIndex] !== strs2[matchLen]) {
            matchLen = next[matchLen - 1];
        }
        if (strs2[curIndex] === strs2[matchLen]) {
            matchLen++;
        }
        next[curIndex] = matchLen;
    }
    matchLen = 0;
    for (let curIndex = 0; curIndex < sLen; curIndex++) {
        while (matchLen && strs1[curIndex] !== strs2[matchLen]) {
            matchLen = next[matchLen - 1];
        }
        if (strs1[curIndex] === strs2[matchLen]) {
            matchLen++;
        }
        if (matchLen === tLen) return curIndex - tLen + 1;
    }
    return -1;
}

module.exports=kmp;
console.log(kmp("ABABCABAA", "AA"));


