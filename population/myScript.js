/* jshint browser: true*/

function getCountries(){

	
	
    var myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://raw.githubusercontent.com/ibrahimparvez2/JSON/master/data1.json", true);
    myRequest.send();
    
    
	myRequest.onload = function() {
        
        
        var choice = document.getElementById("countryList");

		if (myRequest.readyState == 4 && myRequest.status == 200) {

            var myCountries = JSON.parse(myRequest.responseText);
			
          /*  var countryIndex = Math.floor(Math.random() * myCountries.countries.length);
            country =(myCountries.countries[countryIndex]); 
            console.log(country)*/
        
        
        for (var i = 0; i < myCountries.countries.length; i++){
                
            var optionName = myCountries.countries[i];
            /*console.log(optionName);*/
          
            var option = document.createElement("option");
            option.innerHTML = optionName;
            option.setAttribute("value", optionName);
            option.setAttribute("name", optionName);
            choice.appendChild(option);
	       
            }
                
		}
            
	};
    

}
getCountries();

/*  DECLARE GLOBAL VARIABLE WHICH WILL EVENTUALLY BE USED BY EVENT LISTENERS*/

var country = "";
var gender = "";
var year; 
var month = "";
var day = "";
var dob = "";
var le = "";
/*var dob = year + "-" + month + "-" + day;*/

var birth = document.getElementById("dob");
birth.addEventListener("input",myDOB, false);

function myDOB(){

    dob = "" + birth.value + "";

}



function isDate() { 
        // year 
    // date length should be 10 characters (no more no less) 
    var dobError = document.getElementById("dobError");
    if (dob.length < 10 || dob.length > 10) { 
        dobError.innerHTML=  "Format needs to be YYYY-MM-DD"
        
    }
    // third and sixth character should be '-' 
    if (dob.substring(4, 5) !== '-' || dob.substring(7, 8) !== '-') { 
        dobError.innerHTML=  "Format needs to be YYYY-MM-DD";
        
    } 
    // extract month, day and year from the ExpiryDate (expected format is yyyy/mm/dd) 
    // subtraction will cast variables to integer implicitly (needed 
    // for !== comparing) 
    
    month = dob.substring(5, 7) ; // because months in JS start from 0 
    day = dob.substring(8, 10) - 0; 
    year = dob.substring(0, 4) - 0; 
    // test year range 
     if (day <= 0 || day > 31) {
       
        dobError.innerHTML= "Please enter from 01-31 for days";
        
    }
    
     if (month <= 0 || month > 12) {
       
        dobError.innerHTML= "Please enter from 01-12 for months";
        
    }
    if (year <1920 || year > 2017) {
       
        dobError.innerHTML= "Only Years Between 1920 to 2017 YYYY-MM-DD";
        
    }
    else {
        
        console.log(dob);
    }
    
    
}



var countryC = document.getElementById("countryList");
countryC.addEventListener("change", myCountry, false);

function myCountry() {
    
    country = countryC.value;
    console.log(country);
}
    




var genderC = document.getElementById("gender");
genderC.addEventListener("click",checkRadio, false);


function checkRadio(){
    
var len = document.gf1.length;
    /*used gf1 this is what ever you named your form*/
    var i;
    console.log(len);
    for(i=0; i<len; i++){
        
        if (document.gf1[i].checked){
            
            gender = "" + document.gf1[i].value +"";
            console.log(gender);
        }
    }
    
}

/*hwo to validate a radio button*/

function isGender(){
    
    if (gender === "") {

                  document.getElementById("radio_error").innerHTML = "please select a gender";
              } 
                else {

                  document.getElementById("radio_error").innerHTML = "";  
              }
}

    
 
    



/*get all the modal elements then add event listener*/
var modal = document.getElementById("simpleModal");

var modalBtn = document.getElementById("modalBtn");

var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener("click", loadLE, false);

modalBtn.addEventListener("click", closeModal, false);

closeBtn.addEventListener("click", closeModal, false);

window.addEventListener("click", outsideClick, false);

function closeModal(){
    
    modal.style.display = 'none';
}

function outsideClick(e){
    if(e.target==modal){
    modal.style.display = 'none';
    }
}


/*This section loads the data of countries api AND Life Expectancy*/




function loadLE() {

    var myRequest1 = new XMLHttpRequest();
    myRequest1.open("GET", "http://api.population.io:80/1.0/life-expectancy/total/" + gender + "/" + country + "/" + dob + "/", true);
    

    myRequest1.onload = function () {

        if (myRequest1.readyState == 4 && myRequest1.status == 200) {

            var lifeExp = JSON.parse(myRequest1.responseText);
            console.log(lifeExp);
            le = Math.floor(lifeExp.total_life_expectancy);
            var result = document.getElementById("result");
            result.innerHTML = "You have a  life expectancy of " + le + " years.";
            modal.style.display = 'block';
            
            

        }

         isGender();
         isDate();
         loadPop();
    };

    myRequest1.send();

}
    
function loadPop() {

    var myReqest2 = new XMLHttpRequest();
    myReqest2.open("GET", "http://api.population.io:80/1.0/population/" + country + "/" + "today-and-tomorrow/", true);

    myReqest2.onload = function () {
        

        if (myReqest2.readyState == 4 && myReqest2.status == 200) {


            var pop = JSON.parse(myReqest2.responseText);
            console.log(pop);
            var result1 = document.getElementById("result1");
            var expPop = pop.total_population[1].population;
            result1.innerHTML = "Your Country of birth has a expected population tomorrow of " + expPop;
            
        }
    };
    
    myReqest2.send();


}


