// level one round 3.
let score = 0;
let currentAnswer = 0;
let timeRemaining = 100;
let timer;
//creates a random math question and displays it on the page
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    if (num2 > num1 && !(num1 - num2 === 0)) {
        currentAnswer = num1 - num2;
        document.getElementById("question").textContent = `What is ${num1} - ${num2}?`;
    } else if (num1 > num2 && !(num2 - num1 === 0)) {
        currentAnswer = num2 - num1;
        document.getElementById("question").textContent = `What is ${num2} - ${num1}?`;
    }
}
//ends the game and displays the final score
function finishGame(message) {
    clearInterval(timer);
    document.getElementById("question").textContent = message;
    document.getElementById("myAnswer").disabled = true;
    document.getElementById("submitBtn").disabled = true;
}
//updates the timer
function updateTimer() {
    timeRemaining -= 1;
    document.getElementById("timer").textContent = `Time: ${timeRemaining} seconds`;

    if (timeRemaining <= 0) {
        finishGame(`Time's up! You got ${score} out of 10 correct.`);
    }
}
//initializes the first question and starts the timer
generateQuestion();
document.getElementById("timer").textContent = `Time: ${timeRemaining} seconds`;
timer = setInterval(updateTimer, 1000);
//creates a submit feature
document.getElementById("answerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("myAnswer").value.trim();

    if (input !== "" && Number(input) === currentAnswer) {
        score += 1;
        document.getElementById("result").textContent = `Correct! ${score}/10`;
        if (score === 10) {
            finishGame("Great job! You answered all 10 problems correctly.");
        } else {
            generateQuestion();
            document.getElementById("result").value = ``;
        }
    } else {
        document.getElementById("result").textContent = "Incorrect. Try again.";
    }

    document.getElementById("myAnswer").value = "";
});

var msg = `You've finished the packet! Move on to the next packet??`
document.getElementById("endoflevelmsg").textContent = msg;