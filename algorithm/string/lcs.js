/**
 * longest common substring
 * @param str1 string字符串 the string
 * @param str2 string字符串 the string
 * @return string字符串
 */
function lcs( str1 ,  str2 ) {
    // write code here
    let dp=[]
    let maxi,maxj
    let maxlen=0
    for(let i=0;i<str1.length+1;i++){
        dp[i]=[]
        for(let j=0;j<str2.length+1;j++){
            dp[i].push(0)
        }
    }
    for(let i=1;i<str1.length+1;i++){
        for(let j=1;j<str2.length+1;j++){
            if(str1[i-1]!=str2[j-1]){
                dp[i][j]=0
            }else{
                dp[i][j]=dp[i-1][j-1]+1;
                if(dp[i][j]>maxlen){
                    maxlen=dp[i][j]
                    maxi=i
                    maxj=j
                }
            }
        }
    }
    return str2.slice(maxj-maxlen,maxj)
    
}

module.exports = lcs;
