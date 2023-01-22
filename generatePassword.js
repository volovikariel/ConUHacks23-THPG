//DOM ELEMENTS
var ifAddChar = document.getElementById("addChar");
var ifAddNum = document.getElementById("addNum");
var ifAddSpecialChar = document.getElementById("addSpecialChar");
var ifAddSpacer = document.getElementById("addSpacer");
var generate = document.getElementById("genPassword");
var displayPass = document.getElementById("importantPass");
var sliderVal;
var addChar = true;
var addNum = false;
var addSpecialChar = false;
var addSpacer = false;

//This function updates the state of toggle from false (grayed out) to true ( selected )
interval=setInterval(() => {
    addChar= toggled(ifAddChar);
    addNum = toggled(ifAddNum);
    addSpecialChar = toggled(ifAddSpecialChar);
    addSpacer = toggled(ifAddSpacer);
}, 100);

ifAddChar.addEventListener('click', function(e){
    addChar = !addChar;
});

ifAddNum.addEventListener("click", function (e) {
  addNum = !addNum;
});

ifAddSpecialChar.addEventListener("click", function (e) {
  addSpecialChar = !addSpecialChar;
});

ifAddSpacer.addEventListener("click", function (e) {
  addSpacer = !addSpacer;
});

generate.addEventListener("click", function (e) {
  displayPass.setAttribute("value", generatePassword());
});

var interval = setInterval(function () {
  sliderVal = $("#slider").val();
}, 100);

var wordsJSON = null;

fetch("./eff_short_wordlist.json")
  .then((response) => response.json())
  .then((data) => {
    wordsJSON = data;
  });

function fetchNewWord(currentWords) {
  let currWord;
  do {
    currWord = wordsJSON[diceRollInt(4)];
  } while (currentWords.includes(currWord));
  return currWord;
}

//Generate new password with n words
function generatePassword() {
  var password = "";
  var chosenWords = [];
  var currWord = "";
  var rerolls = 0;
  let possiblePasswordLength;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "[!@#$%^&*()+-=[]{};':\"|,.<>/?]+\\";

  do {
    possiblePasswordLength = password.length + currWord.length + (addSpacer ? 1 : 0);
    currWord = fetchNewWord(chosenWords);
    if (possiblePasswordLength <= sliderVal) {
      password += currWord;
      if (addSpacer) {
        password += "_";
      }
      chosenWords.push(currWord);
    }
  } while ((sliderVal - password.length) >= 5);

  // At this point, we're guaranteed to have 4 characters left to auto-generate (5 if no addSeparator)
  while (password.length < sliderVal) {
    password += chars.charAt(randInt(0, chars.length - 1));
  }

  if (addChar) {
    password = password.substring(0, password.length - 1);
    password += chars.charAt(randInt(0, chars.length - 1));
  }

  if (addNum) {
    password = password.substring(0, password.length - 1);
    password += numbers.charAt(randInt(0, numbers.length - 1));
  }

  if (addSpecialChar) {
    password = password.substring(0, password.length - 1);
    password += specialChars.charAt(randInt(0, specialChars.length - 1));
  }

  return password;
}

//returns a randomw word from the dict
function getWord(){
    return wordsJSON[diceRollInt(4)];
}

//Random int based on size n of dict
function diceRollInt(n) {
  var sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.pow(10, i) * randInt(1, 6);
  }
  return sum;
}

function randInt(min, max) {
  var val = Math.floor(Math.random() * (max - min + 1) + min);
  return val;
}

function toggled(btn){
    if (btn.classList.contains('toggle')) return false;
    else return true;
}