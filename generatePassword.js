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

    while(password.length < sliderVal){
        //generate current word
        currWord = getWord();
        
        //check if current word is a duplicate
        while(chosenWords.includes(currWord)){
            currWord = getWord();
        }

        //Check if adding the current word to the password goes over the limit
        if(password.length+currWord.length <= sliderVal){
            password += currWord;
            //if the length of the password is what we need, dont add spacer
            if(addSpacer && password.length != sliderVal){
                password += "_";
            }
            //Add current word to list of words
            chosenWords.push(currWord);
        }
        else{
            //reroll words for a chance to get one we can use
            while(rerolls++<5){
                currWord = getWord();
                //Check if adding the current word to the password goes over the limit
                if(password.length+currWord.length <= sliderVal){
                    password += currWord;
                    if(addSpacer && password.length != sliderVal){
                        password += "_";
                    }
                    //add current word to list of words
                    chosenWords.push(currWord);
                    //break out of loop so we dont need to keep rerolling
                    break;
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

//returns a randomw word from the dict
function getWord(){
    return wordsJSON[diceRollInt(4)];
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
