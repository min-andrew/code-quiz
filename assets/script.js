// timer application
// things to do :
// 1. minus seconds if you answer incorrectly
// 2. start timer app when quiz gets pressed 

var timerEl = document.getElementById('timer');

// The countdown function starts and stops the timer and triggers highScore()
function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Timer: " + timeLeft;

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            // Calls function to create and append image
            // log high score value into localstorage 
        }
    }, 1000);
}

// quiz application 
var startButton = document.querySelector("#start");
var startPage = document.querySelector("#startPage");
var questionPage = document.querySelector("#questionPage");

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);

// startQuiz function is started when start button is pressed 
function startQuiz() {
    // Timer starts when quiz is started 
    countdown();
};

var questionSource = [
    {
        question: "Questions 1 : Which of the options is not a data type in JavaScript.",
        choices: ["a. Boolean", "b. Object", "c. Subject", "d. Undefined"],
        answer: "c"
    },
    {
        question: "Questions 2 : Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c"
    },
    {
        question: "Questions 3 : How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b"
    },
    {
        question: "Questions 4 : How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c"
    },
    {
        question: "Questions 5 : To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
        answer: "b"
    },
    {
        question: "Questions 6 : The second index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a"
    },
    {
        question: "Questions 7 : How to write an IF statement in JavaScript?",
        choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
        answer: "c"
    },
    {
        question: "Questions 8 : Which event occurs when the user clicks on an HTML element?",
        choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
        answer: "a"
    }
];

// After finishing a startQuiz, name is inputted and saved 
var userName = document.querySelector("#usernamePage");

// your score application
// 

var highScore = document.querySelector("#highscorePage");