//DOM ELEMENTS
var ifAddChar = document.getElementById('addChar');
var ifAddNum = document.getElementById('addChar');
var ifAddSpecialChar = document.getElementById('addSpecialChar');
var ifAddSpacer = document.getElementById('addSpacer');
var generate = document.getElementById("genPassword");
var displayPass = document.getElementById("passDisp");
var sliderVal;
var addChar = true;
var addNum = false;
var addSpecialChar = false;
var addSpacer = false;

//This function updates the state of toggle from false (grayed out) to true ( selected )
interval=setInterval(() => {
    addChar=toggled(ifAddChar);
    addNum = toggled(ifAddNum);
    addSpecialChar = toggled(ifAddSpecialChar);
    addSpacer =toggled(ifAddSpacer);
}, 100);



ifAddChar.addEventListener('click', function(e){
    addChar = !addChar;
});

ifAddNum.addEventListener('click', function(e){
    addNum = !addNum;
});

ifAddSpecialChar.addEventListener('click', function(e){
    addSpecialChar = !addSpecialChar;
});

ifAddSpacer.addEventListener('click', function(e){
    addSpacer = !addSpacer;
});

generate.addEventListener('click', function(e){
    displayPass.innerHTML = generatePassword();
});

SetInterval(function(){
    sliderVal = $("#slider").val();
}, 100);

var wordsJSON = null;

fetch('./eff_short_wordlist.json')
.then(response => response.json())
.then(data => {wordsJSON=data})

//Generate new password with n words
function generatePassword(){
    var password = ""
    var chosenWords = [];
    var currWord;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789'
    const specialChars = '[!@#$%^&*()_+-=[]{};\':\"|,.<>/?]+\\'

    while(password.length < 5){
        currWord = wordsJSON[diceRollInt(4)]
        while(chosenWords.includes(currWord)){
            currWord = wordsJSON[diceRollInt(4)];
        }
        if(!(password.length + currWord.length > sliderVal)){
            password += currWord;
            if(ifAddSpacer) password += "_";
            chosenWords.push(currWord);
        }
    }

    while(password.length < sliderVal){
        password += chars[randInt(0, 26)];
    }

    if(addChar){
        password = password.substring(0,password.length);
        password += chars[randInt(0,26)];
    }
    
    if(addNum){
        password = password.substring(0,password.length);
        password += numbers[randInt(0,26)];
    }
    
    if(addSpecialChar){
        password = password.substring(0,password.length);
        password += specialChars[randInt(0,26)];
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

function toggled(btn){
    if (btn.classList.contains('toggle')) return false;
    else return true;
}