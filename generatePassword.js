//Generate new password with n words
function generatePassword(n){
    let password = "";
    for(let i=0; i<n; i++){
        password += diceware[generateRandInt()];
    }   
    return password;
}

//Random int based on size of dict
function generateRandInt(){
    let max = 66667;
    let min = 11111;
    return Math.floor(Math.random() * (max - min) + min);
}