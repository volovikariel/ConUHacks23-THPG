// DOM ELEMENTS
var input = document.getElementById('pass');
var answer = document.getElementById("answer");
var improveB = document.getElementById("improveB");
var createPass = document.getElementById("createP");
var mainPopup = document.getElementById("mainPopup");
var babyPopup = document.getElementById("babyPopup");
var passExists = false;
var autocomplete =null;

createPass.onclick=function(){
    babyPopup.style.display = 'none';
    mainPopup.style.display= 'block';
    
}

// WHEN PASSWORD INPUT CHANGES RUN THIS
input.addEventListener('input',function(e){  
    console.log("Changing password");
  
    if (input.value ===""){
        answer.innerText= "Waiting..";
        improveB.style.visibility="hidden";
    }
    if (input.value!= ""){
        answer.innerText= "keep it up";
        improveB.style.visibility ='visible';
    }
    if (input.value === "1234"){
        answer.innerText= "Your password sucks!";
    }
    
});

if(autocomplete!=null){
    console.log('Found autocomplete!')
}

//How safe is password?


fetch('./SafetyTable.json')
.then(response => response.json())
.then(data => {table=data})
 function howsafe( password){
    
    //Figure out which categorie the password is in
    index = 0;
    if(containsOnlyNumbers(password)) index = 1;
    else if(containsLowercase(password)&& !containsUppercase(password)&& !containsSpecialchar(password) && !containsNumbers(password)) index = 2;
    else if (containsLowercase(password)&& containsUppercase(password)&& !containsSpecialchar(password)&& !containsNumbers(password)) index = 3;
    else if(containsLowercase(password)&& containsUppercase(password)&& !containsSpecialchar(password)&& containsNumbers(password)) index =4;
    else if (containsLowercase(password)&& containsUppercase(password)&& containsSpecialchar(password)&& containsNumbers(password)) index =5;
    else index =1;

    console.log("Index is"+index);
    //Parse password to string to get its length
    password = password.toString();
    l =  password.length-4; 
    if(l>14) l = 14;
    console.log("Length is"+index);

    switch (index) {
        case 1:
            return table[l]['Numbers Only']
            break;
        case 2:
            return table[l]['Lowercase Letters']
            break;
        case 3:
            return table[l]['Upper and Lowercase Letters']
           
            break;
        case 4:
            return table[l]['Numbers, Upper and Lowercase Letters']
            
            break;
        case 5:
            return table[l]['Numbers, Upper and Lowercase Letters, Symbols']
            break;
    
        default:
            return "Couldn't calculate O-O' "
            break;
    }

}

function containsOnlyNumbers(password) {
    return /^\d+$/.test(password);
  }
  function containsNumbers(str){
    return /\d/.test(str);
  }
function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
function containsLowercase(str) {
    return /[a-z]/.test(str);
  }
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
function containsSpecialchar(str){
    return format.test(str);
}