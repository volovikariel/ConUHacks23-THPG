//DOM ELEMENTS
var ifCapitalizeChar = document.getElementById("capitalizeChar");
var ifAddNum = document.getElementById("addNum");
var ifAddSpecialChar = document.getElementById("addSpecialChar");
var ifAddSpacer = document.getElementById("addSpacer");
var generate = document.getElementById("genPassword");
var displayPass = document.getElementById("importantPass");
var sliderVal;
var capitalizeChar = false;
var addNum = false;
var addSpecialChar = false;
var addSpacer = false;

const wordSeparator = '_'

//This function updates the state of toggle from false (grayed out) to true ( selected )
interval=setInterval(() => {
    capitalizeChar= isToggled(ifCapitalizeChar);
    addNum = isToggled(ifAddNum);
    addSpecialChar = isToggled(ifAddSpecialChar);
    addSpacer = isToggled(ifAddSpacer);
}, 100);

ifCapitalizeChar.addEventListener('click', function(e){
    capitalizeChar = !capitalizeChar;
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
  let candidatePasswordLength;
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "[!@#$%^&*()+-=[]{};':\"|,.<>/?]+\\";
  const requiredPasswordLength = sliderVal - (addNum ? 1 : 0) - (addSpecialChar ? 1 : 0);

  do {
    currWord = fetchNewWord(chosenWords);
    candidatePasswordLength = password.length + currWord.length + (addSpacer ? 1 : 0);
    if (candidatePasswordLength <= requiredPasswordLength) {
      password += currWord;
      if (addSpacer) {
        password += wordSeparator;
      }
      chosenWords.push(currWord);
    }
  } while ((requiredPasswordLength - password.length) >= 5);

  while (password.length < requiredPasswordLength) {
    password += chars.charAt(randInt(0, chars.length - 1));
  }

  // Don't allow for the word separator to appear at the end
  // We ONLY care about this when we're sure that it'll be the last character (no num/special char will be added)
  if (password.length === sliderVal && password.at(-1) === wordSeparator) {
    password = password.substring(0, password.length - 1);
    password += chars.charAt(randInt(0, chars.length - 1));
  }

  if (capitalizeChar) {
    password = password[0].toUpperCase() + password.substring(1);
  }

  if (addNum) {
    password += numbers.charAt(randInt(0, numbers.length - 1));
  }

  if (addSpecialChar) {
    password += specialChars.charAt(randInt(0, specialChars.length - 1));
  }

  return password;
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

function isToggled(btn){
    return !btn.classList.contains('toggle');
}