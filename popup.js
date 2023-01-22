
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
        //answer.innerText= "Your password sucks!";
        answer.innerText=generatePassword(3);
    }
    
});

if(autocomplete!=null){
    console.log('Found autocomplete!')
}

//How safe is password?

