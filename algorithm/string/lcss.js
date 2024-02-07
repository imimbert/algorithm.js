var lcss = function (text1, text2) {
    const m = text1.length, n = text2.length
    let dp = new Array(m + 1).fill(0).map(m => new Array(n + 1).fill(0))
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    function Subsequence(text1, dp) {
        quence = ''
        count = dp[m][n]
        for (let i = m; i > 0; i--) {
            for (let j = n; j > 0; j--) {
                if (dp[i][j] > dp[i - 1][j] && dp[i][j] > dp[i][j - 1] && dp[i][j] === count) {
                    quence += text1[i - 1]
                    count--
                }
            }
        }
        return quence
    }
    // console.log(Subsequence(text1, dp).split('').reverse().join(''))
    return [dp[m][n],Subsequence(text1, dp).split('').reverse().join('')]
};

console.log(lcss("mdrgra","mdra"));
module.exports=lcss;