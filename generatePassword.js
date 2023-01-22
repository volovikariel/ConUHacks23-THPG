//Generate new password with n words
var wordsJSON = null;

fetch('./eff_short_wordlist.json')
.then(response => response.json())
.then(data => {wordsJSON=data})


function generatePassword(minLen, maxLen){
    var password = ""
    var chosenWords = [];
    var currWord;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    while(password.length < minLen){
        currWord = wordsJSON[diceRollInt(4)]
        while(chosenWords.includes(currWord)){
            currWord = wordsJSON[diceRollInt(4)];
        }
        if(!(password.length + currWord.length > maxLen)){
            password += currWord;
            chosenWords.push(currWord);
        }
    }

    while(password.length < maxLen){
        password += chars[randInt(0, 26)];
    }

    return password;
}

//Random int based on size n of dict
function diceRollInt(n){
    var sum = 0;
    for(let i=0; i<4; i++){
        sum += Math.pow(10,i)*randInt(1, 4);
    }
    return sum;
}

function randInt(min, max){
    var val = Math.floor((Math.random())*(max-min+1)+min);
    return val;
}

export{generatePassword};