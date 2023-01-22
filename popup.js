// DOM ELEMENTS
var input = document.getElementById('pass');
var answer = document.getElementById("answer");
var improveB = document.getElementById("improveB");
var createPass = document.getElementById("createP");
var mainPopup = document.getElementById("mainPopup");
var babyPopup = document.getElementById("babyPopup");
var passCrackTime = document.getElementById("lengthToCrack");
var sliderNumb = document.getElementById("slidernum");
var passExists = false;
var autocomplete =null;



// WHEN PASSWORD INPUT CHANGES RUN THIS
// input.addEventListener('input',function(e){  
//     console.log("Changing password");
    
//     if (input.value ===""){
//         improveB.style.visibility="hidden";
        
//     }
//     if (input.value!= ""){
//         improveB.style.visibility ='visible';
//         passCrackTime.innerText=howsafe(input.value);
//     }
    
    
// });

if(autocomplete!=null){
    console.log('Found autocomplete!')
}

//How safe is password?

let table = null;
fetch('./SafetyTable.json')
.then(response => response.json())
.then(data => {table=data})
 function howsafe( password){
    
    console.log('Im here')
    //Figure out which categorie the password is in
    var index = 1;

    console.log('Whats up')

    if(containsOnlyNumbers(password)) index = 1;
    else if(containsLowercase(password)&& !containsUppercase(password)&& !containsSpecialchar(password) && !containsNumbers(password)) index = 2;
    else if (containsLowercase(password)&& containsUppercase(password)&& !containsSpecialchar(password)&& !containsNumbers(password)) index = 3;
    else if(containsLowercase(password)&& containsUppercase(password)&& !containsSpecialchar(password)&& containsNumbers(password)) index =4;
    else if (containsLowercase(password)&& containsUppercase(password)&& containsSpecialchar(password)&& containsNumbers(password)) index =5;
    else index =1;

    console.log("Index is"+index);
    //Parse password to string to get its length
    password = password.toString();
    var l =  password.length-4; 
  
    if(l>18){return l*2+40+"qntn years"};
    if (l<0) l= 0;
    

    console.log("Length is"+index);

    switch (index) {
        case 1:
            return table[l]['Numbers Only']
        case 2:
            return table[l]['Lowercase Letters'] 
        case 3:
            return table[l]['Upper and Lowercase Letters']
        case 4:
            return table[l]['Numbers, Upper and Lowercase Letters']
        case 5:
            return table[l]['Numbers, Upper and Lowercase Letters, Symbols']
        default:
            return "Couldn't calculate O-O' "
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



// Password generator


// var passwords = ['password123', 'qwertyuiop', 'admin2015', 'trustno1', 'letmein6969'];
// var indexOld;
// var index = Math.floor((Math.random() * passwords.length));
// var password = passwords[index];
// var characters = [];
// var counter = 0;
	
// var interval = setInterval(function(){
// 		for(let i = 0; i < counter; i++) {
// 			characters[i] = password.charAt(i);
// 		}
// 		for(let i = counter; i < password.length; i++) {
// 			characters[i] = Math.random().toString(36).charAt(2);
// 		}
// 		$('.password').text(characters.join(''));
        
// 	}, 1000);
	
   
//     //JQery works
//     if (typeof $ == 'function'){
//         console.log("YAY");
//     }

   //slider updater

   var interval = setInterval(function(){
    let val = $("#slider").val();
    sliderNumb.innerText=val;
}, 100);
    