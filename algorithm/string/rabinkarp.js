const prime = 101; // 选取一个质数作为进制

function rabinkarp(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    const patternHash = hash(pattern, m);
    let textHash = hash(text, m);

    for (let i = 0; i <= n - m; i++) {
        if (textHash === patternHash && checkEqual(text, i, pattern, 0, m)) {
            return i;
        }

        if (i < n - m) {
            textHash = recalculateHash(text, i, i + m, textHash, m);
        }
    }

    return -1;
}

function hash(str, len) {
    let hashValue = 0;
    for (let i = 0; i < len; i++) {
        hashValue += str.charCodeAt(i) * Math.pow(prime, i);
    }
    return hashValue;
}

function recalculateHash(str, oldIndex, newIndex, oldHash, len) {
    let newHash = oldHash - str.charCodeAt(oldIndex);
    newHash = newHash / prime;
    newHash += str.charCodeAt(newIndex) * Math.pow(prime, len - 1);
    return newHash;
}

function checkEqual(str1, start1, str2, start2, len) {
    for (let i = 0; i < len; i++) {
        if (str1[start1 + i] !== str2[start2 + i]) {
            return false;
        }
    }
    return true;
}

module.exports = rabinkarp;