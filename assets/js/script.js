// Wait for the DOM to finish loading before running the game
// Get the bottom elements and add event listeners to them

//Listen to the event of having the entire HTML page loaded. when it loads, do this function
document.addEventListener("DOMContentLoaded", function() {
    //We are gathering all of the buttons on the HTML page
    let buttons = document.getElementsByTagName('button');

    //There are multiple buttons so we need to loop through them to individualize them. hence, 'buttons -> button'.
    // when we have all the individual buttons laid out in the for loop, it will listen for a click.
    for (let button of buttons){
        button.addEventListener("click", function() {
            // when single button is clicked, the data-type of the HTML will be read. if it is submit, the submit
            //alert will come up
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            //if data type read from HTML is not submit, it will call the function "runGame" and it will assign
            // a variable called gameType to the clicked individual button. the data type from HTML of the button is inserted
            // as the variable
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })
    runGame("addition");

})

/**
 *  The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = '';
    document.getElementById("answer-box").focus();

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // if the button 'addition' was clicked, the data type of addition button was inserted into the variable gameType
    // as described earlier. So here, if the variable is 'addition' (inserted from the button click), the addition
    // game function will run. otherwise
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer(){
    
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :)")
        incrementScore();
    } else {
        alert(`Sorry! You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === '-') {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}


/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore(){

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer(){
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
    
}

function displaySubtractQuestion(operand1, operand2){

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

/* for challenge
function displayDivisionQuestion(){

}

*/