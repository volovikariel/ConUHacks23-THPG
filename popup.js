// DOM ELEMENTS
var importantPass = document.getElementById('importantPass');
var answer = document.getElementById("answer");

var createPass = document.getElementById("createP");
var mainPopup = document.getElementById("mainPopup");
var babyPopup = document.getElementById("babyPopup");
var passCrackTime = document.getElementById("lengthToCrack");
var sliderNumb = document.getElementById("slidernum");
var passExists = false;
var autocomplete =null;
var copytoClip = document.getElementById("copytoClip");



// WHEN PASSWORD INPUT CHANGES RUN THIS
importantPass.addEventListener('input',function(e){  
    console.log("Changing password");
    if (importantPass.value!= ""){
        passCrackTime.innerText=howsafe(importantPass.value);
    }
});

let interval3 = setInterval(() => {
    if (importantPass.value!= ""){
        passCrackTime.innerText=howsafe(importantPass.value);
    }
    importantPass.value = importantPass.innerText;

}, 50);

if(autocomplete!=null){
    console.log('Found autocomplete!')
}

//How safe is password?

let table = null;
fetch('./SafetyTable.json')
.then(response => response.json())
.then(data => {table=data})
 function howsafe( password){
    
   
    //Figure out which categorie the password is in
    var index = 0;

   
    if(containsLowercase(password))index=index+1;
    if(containsNumbers(password))index=index+1;
    if(containsUppercase(password))index=index+1;
    if(containsSpecialchar(password))index=index+1;
    

   
    //Parse password to string to get its length
    password = password.toString();
    var l =  password.length-4; 
    
    if(l >= 14 && index == 2){
        return l*2+40+"k years";
    };
    if(l >= 14 && index == 3){
        return l*2+40+"bn years";
    };
    if(l >= 14 && index == 4){
        return l*2+40+"qtn years";
    };
    if (l<0) l= 0;
    console.log("Length is"+l);

    

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


//Not very robust text size code

importantPass.addEventListener('input',function(e){  
    // This runs when password is changed
    checkPassSize(importantPass)
})
let interval2 = setInterval(() => {
        checkPassSize(importantPass);
}, 100);

function checkPassSize (importantPass){
    if (importantPass.value.length <5){
        importantPass.style.fontSize = '50px'
    }
    else if (importantPass.value.length <12){
        importantPass.style.fontSize = '40px'
    }
    else if (importantPass.value.length <18){
        importantPass.style.fontSize = '30px'
    }
    else if (importantPass.value.length <25){
        importantPass.style.fontSize = '20px'
    }
}

//Copy from clipboard


copytoClip.addEventListener('click'
,function (e) {
    // Get the text field
    var copyText = document.getElementById("importantPass");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    
  });

  //Code for topButtons Toggle

 

  let btns = document.querySelectorAll(".toggle");


btns.forEach(btn => {
   btn.addEventListener('click', (event)=> {
    btn.classList.toggle('toggle')   
   });

});
