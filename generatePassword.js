//DOM ELEMENTS
var ifAddChar = document.getElementById('addChar');
var ifAddNum = document.getElementById('addNum');
var ifAddSpecialChar = document.getElementById('addSpecialChar');
var ifAddSpacer = document.getElementById('addSpacer');
var generate = document.getElementById('genPassword');
var displayPass = document.getElementById('importantPass');
var sliderVal;
var addChar = true;
var addNum = false;
var addSpecialChar = false;
var addSpacer = false;

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
    displayPass.setAttribute('value', generatePassword());
});

var interval = setInterval(function(){
    sliderVal = $('#slider').val();
}, 100);

var wordsJSON = null;

fetch('./eff_short_wordlist.json')
.then(response => response.json())
.then(data => {wordsJSON=data});

//Generate new password with n words
function generatePassword(){
    var password = "";
    var chosenWords = [];
    var currWord;
    var rerolls = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '[!@#$%^&*()+-=[]{};\':\"|,.<>/?]+\\';

    while(password.length < 5){
        currWord = wordsJSON[diceRollInt(4)];
        while(chosenWords.includes(currWord)){
            currWord = wordsJSON[diceRollInt(4)];
        }
        if(password.length+currWord.length < sliderVal){
            password += currWord;
            if(addSpacer){
                password += "_";
            }
            chosenWords.push(currWord);
        }
        else{
            while(rerolls++<20){
                currWord = wordsJSON[diceRollInt(4)];
                if(password.length+currWord.length < sliderVal){
                    password += currWord;
                    if(addSpacer){
                        password += "_";
                    }
                    chosenWords.push(currWord);
                }
            }
            
        }
    }

    while(password.length < sliderVal){
        password += chars.charAt(randInt(0,chars.length-1))
    }

    if(addChar){
        password = password.substring(0,password.length-1);
        password += chars.charAt(randInt(0,chars.length-1))
    }
    
    if(addNum){
        password = password.substring(0,password.length-1);
        password += numbers.charAt(randInt(0,numbers.length-1))
    }
    
    if(addSpecialChar){
        password = password.substring(0,password.length-1);
        password += specialChars.charAt(randInt(0,specialChars.length-1))
    }

    return password;
}

//Random int based on size n of dict
function diceRollInt(n){
    var sum = 0;
    for(let i=0; i<n; i++){
        sum += Math.pow(10,i)*randInt(1, 6);
    }
    return sum;
}

function randInt(min, max){
    var val = Math.floor((Math.random())*(max-min+1)+min);
    return val;
}
