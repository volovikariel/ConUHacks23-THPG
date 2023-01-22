//Generate new password with n words
let wordsJSON = null;

fetch('./eff_short_wordlist.json')
.then(response => response.json())
.then(data => {wordsJSON=data})

function generatePassword(n){
    let password = "";
    for(let i=0; i<n; i++){
        password += wordsJSON[diceRollInt(4)];
    }   
    return password;
}

//Random int based on size n of dict
function diceRollInt(n){
    let sum = 0;
    for(let i=0; i<4; i++){
        sum += Math.pow(10,i)*randInt(1,n+1);
    }
    return sum;
}

function randInt(max){
    let val = Math.floor((Math.random())*(max-1)+1);
    return val;
}

export{generatePassword};