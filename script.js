
/* The below function will shuffle the generated passwrod array based on the Fisher-Yates shuffle algorithm. This will be used later in the generatePassword function below
code source: https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
*/

function shuffle(array) {
    var m = array.length, temp, i;
  
    // Check if there's still elements remaining
    while (m) {
  
      // Pick remaining element
      i = Math.floor(Math.random() * m--);
  
      // Swap it with the current element
      temp = array[m];
      array[m] = array[i];
      array[i] = temp;
    }

    return array;
  }



// get the slider input for password length //
var getSlider = document.getElementById("password-slider");


/* The below function hides and displays the password slider for password length based on checkbox selection */

function displayPasswordSlider () {

    // get the password length checkbox //
    var checkBoxPassword = document.getElementById("password-length-check");

    //get the div containing the slider //
    var getDiv = document.getElementById("password-slider-box");

    // get the slider element value//
    var getSliderValue =document.getElementById("sliderValue");

    /* if the checkbox is checked, then display the slider div, else hide the slider div and also reset slider value to 8 */

    if (checkBoxPassword.checked) {
        getDiv.style.display = "block";
        getSlider.value = "8";
        getSliderValue.innerHTML = "8";
    }
    else {
        getDiv.style.display = "none";
        getSlider.value = "8";
    }
}

/* The below function displys the value of the slider as it is dragged to indicate password length */
function changeSliderValue () {

    
    // update the slider value by changing its innerHTML //
    getSlider.addEventListener("input", function () {
        document.getElementById("sliderValue").innerHTML = getSlider.value;
    });
}


/* The below function will check if atleast one of the required checkboxes are selected, if not it will disable the generate password button and display the required prompt */

function checkboxRequired () {

    // get the div containing all checkboxes in the customisation options //
    var getCheckboxDiv = document.getElementById("customisation-box-2");

    // check how many boxes are checked in the customisation options //
    var checkLength = getCheckboxDiv.querySelectorAll("input[type='checkbox']:checked").length;

    // get the error message element //
    var getErrorMsg = document.getElementById("customisation-box-submit-error");

    // get the submit button //
    var getSubmitBtn = document.getElementById("btn-generate-password");

    /* if the number of checkboxes is less than one, disable the submit button and display the required prompt, else hide the prompt and enable the button */
    if (checkLength < 1) {

        getErrorMsg.style.display = "block";
        getSubmitBtn.setAttribute("disabled","");
    }
    else {
        getErrorMsg.style.display = "none";
        getSubmitBtn.removeAttribute("disabled","");
    }
}

// The below function displays the copy button when the passwordf is generated //
function displayCopy() {

    var getCopybtn = document.getElementById("copy-btn");

    if (getCopybtn.style.display = "none") {

        getCopybtn.style.display = "block";
    }
    else {
        getCopybtn.style.display = "none";
    }
}

// Th ebelow function will copy the password when the copy button is clicked //
function copyPassword () {

    // Get the text field //
    var copyText = document.getElementById("password-box");

    //create a selection range
    var CopyRange = document.createRange();

    //choose the element we want to select the text of
    CopyRange.selectNode(copyText);

    //select the text inside the range
    window.getSelection().addRange(CopyRange);

    //copy the text to the clipboard
    document.execCommand("copy");
}

/* The below function uses a simple algorithm to generate the password based on the selections in password customisation box  */

function generatePassword () {

    /* The below arrays are the base arrays from which caharacters will be selected to form the password as per selected options */

    var lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];

    var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
    
    var allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,];
    
    var allSymbols = [" ", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", ",", ".", "/", "<", ">", "?", "[", "]", "{", "}", "+", "-",];


    // length of the password based on slider value, default is 8 //
    var passLength = getSlider.value;

    // Empty array that will store the random items from default arrays //
    var alphaPassword = [];


    // empty string decalaration to store generated password// 
    var newPassword = "";

    // setting the length od the password //
    newPassword.length = passLength;

    // get the div containing all checkboxes in the customisation options //
    var getCheckboxDiv = document.getElementById("customisation-box-2");

    // check how many boxes are checked in the customisation options //
    var checkLength = getCheckboxDiv.querySelectorAll("input[type='checkbox']:checked").length;

    /* the value that will decide how many items to pull from each of the default arrays, it is set to be an integer to avoid a complicated algorithm */
    var multiple = parseInt((passLength/checkLength));

    /* The below variable declarations check for the customisation boxes that are checked. */

    var checkLowercase = document.getElementById("checkbox-lowercase").checked;

    var checkUppercase = document.getElementById("checkbox-uppercase").checked;

    var checkNumbers = document.getElementById("checkbox-numbers").checked;

    var checkSymbols = document.getElementById("checkbox-symbols").checked;


    /* The below loops check for which checkboxes have been checked and if selected, push the required number of items into the password array  */
    if (checkLowercase) {

        for (let index = 0; index < multiple; index++) {
            alphaPassword.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
        }
    }

    if (checkUppercase) {

        for (let index = 0; index < multiple; index++) {
            alphaPassword.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
        }
    }

    if (checkNumbers) {

        for (let index = 0; index < multiple; index++) {
            alphaPassword.push(allNumbers[Math.floor(Math.random() * allNumbers.length)]);
        }
    }

    if (checkSymbols) {

        for (let index = 0; index < multiple; index++) {
            alphaPassword.push(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
        }
    }

    /* The below code will add additional items to the password array if the length of the array after running the above code is less than the length selected by the user, this may happen because the multiple is set to be an integer rounded off  */


    if (alphaPassword.length < passLength){

        var lengthDiff = (passLength - alphaPassword.length);

        if (checkLowercase) {

            for (let index = 0; index < lengthDiff ; index++) {
                alphaPassword.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
            }
        }

        else if (checkUppercase) {

            for (let index = 0; index < lengthDiff ; index++) {
                alphaPassword.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
            }
        }

        else if (checkNumbers) {

            for (let index = 0; index < lengthDiff ; index++) {
                alphaPassword.push(allNumbers[Math.floor(Math.random() * allNumbers.length)]);
            }
        }

        else if (checkSymbols) {

            for (let index = 0; index < lengthDiff ; index++) {
                alphaPassword.push(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
            }
        }
    }

    else {

        alphaPassword.length = passLength;
    }

    // below fucntion shuffles the password as per Fisher Yates algorithm //
    shuffle(alphaPassword);

    /* below code will display the password in the password box, will also remove the commas from the array */
    var getPasswordDiv = document.getElementById("password-box").innerHTML = alphaPassword.join('');


    // below function will display the copy button //
    displayCopy();

}

    /* below console.log statetements help in debugging above functions ----

    console.log("password length should be " + passLength);

    console.log("number of boxes selected are " + checkLength);

    console.log("multiple is " + multiple);

    console.log(alphaPassword);

    console.log("The array length is " + alphaPassword.length);
    */

    /*****************************************************/
            /********** End of Script **********/

