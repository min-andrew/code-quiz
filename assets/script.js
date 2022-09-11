// Header variables
var rightSide = document.querySelector("#right_side");
var leftSide = document.querySelector("#left_side");
var scoreCheck = document.querySelector("#score_check");

// Start page variables
var welcomePage = document.querySelector("#welcome");
var startBtn = document.querySelector("#start_button");
var startPage = document.querySelector("#start_page");

// Question page variables 
var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");
var reactButtons = document.querySelectorAll(".choices");
var choiceBtn1 = document.querySelector("#choice_btn1");
var choiceBtn2 = document.querySelector("#choice_btn2");
var choiceBtn3 = document.querySelector("#choice_btn3");
var choiceBtn4 = document.querySelector("#choice_btn4");
var answerCheck = document.querySelector("#answer_check");

// Score submit page 
var submitPage = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit_btn");

// High score page 
var highScorePage = document.querySelector("#highscore_page");
var Scores = document.querySelector("#scores");
var finished = document.querySelector("#finished");
var backBtn = document.querySelector("#back_btn");
var clearBtn = document.querySelector("#clear_btn");

//Questions
var questionBank = [
    {
        question: "Question 1 : What uses does Javascript NOT have?",
        choices: ["a. Create dynamically updating content", "b. Write files on the server", "c. Control multimedia", "d. Animate images"],
        answer: "b"
    },
    {
        question: "Question 2 : JavaScript data types DO NOT include:",
        choices: ["a. Null", "b. Booleans", "c. Defined", "d. Symbol"],
        answer: "c"
    },
    {
        question: "Question 3 : What do you create an array with in JavaScript",
        choices: ["a. Parenthesis", "b. Brackets", "c. Squiggly Brackets", "d. Hashtags"],
        answer: "b"
    },
    {
        question: "Question 4 : What is NOT a way to declare a variable?",
        choices: ["a. var", "b. let", "c. with", "d. const"],
        answer: "c"
    },
    {
        question: "Question 5 : The first index in an array is?",
        choices: ["a. 1", "b. i", "c. a", "d. 0"],
        answer: "d"
    }
];

//Set other variables
var timeLeft = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

/*Functions*/
// timer 
function timer() {

    var timerInterval = setInterval(function () {

        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Finished!";
            // if time is up, show on score board content instead of "all done!"
            finished.textContent = "Finished!";
            gameOver();

        } else if (questionCount >= questionBank.length + 1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
};

//start the quiz
function quizStart() {
    startPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    timer();
    showQuestion(questionNumber);

};

//presents the questions and answers
function showQuestion(n) {
    askQuestion.textContent = questionBank[n].question;
    choiceBtn1.textContent = questionBank[n].choices[0];
    choiceBtn2.textContent = questionBank[n].choices[1];
    choiceBtn3.textContent = questionBank[n].choices[2];
    choiceBtn4.textContent = questionBank[n].choices[3];
    questionNumber = n;
};

//answer check
function checkAnswer(event) {
    event.preventDefault();
    //make it display
    answerCheck.style.display = "block";
    setTimeout(function () {
        answerCheck.style.display = 'none';
    }, 1000);

    if (questionBank[questionNumber].answer == event.target.value) {
        answerCheck.textContent = "Correct!";
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 7;
        answerCheck.textContent = "Wrong! The correct answer is " + questionBank[questionNumber].answer + " .";
    }
    //THEN I am presented with another question
    if (questionNumber < questionBank.length - 1) {
        // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNumber + 1);
    } else {
        gameOver();
    }
    questionCount++;
};

//WHEN all questions are answered or the timer reaches 0, Game is over
function gameOver() {

    questionPage.style.display = "none";
    submitPage.style.display = "block";
    console.log(submitPage);
    // show final score
    finalScore.textContent = "Your final score is " + totalScore;
    // clearInterval(timerInterval);  
    timeLeft.style.display = "none";
};

// get current score and initials from local storage
function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

// add scores to the score board
function addScore() {
    Scores.innerHTML = "";
    Scores.style.display = "block";
    var highScores = sort();
    //show the top five high scores. 
    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        // Show the score list on score board
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        Scores.appendChild(li);
    }
};

// sort score and ranking the highscore list
function sort() {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    } else {
        unsortedList.sort(function (a, b) {
            return b.score - a.score;
        })
        return unsortedList;
    }
};

// push new score and initial to local storage
function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    var scoreItem = {
        user: userInitials.value,
        score: totalScore
    };
    addItem(scoreItem);
    addScore();
};

/* Add event listeners*/
// startbtn to start the quiz
startBtn.addEventListener("click", quizStart);

//click any choices button, go to the next question
reactButtons.forEach(function (click) {
    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    submitPage.style.display = "none";
    startPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    saveScore();
});

// check high score list
scoreCheck.addEventListener("click", function (event) {
    event.preventDefault();
    submitPage.style.display = "none";
    startPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    addScore();
});

// back to start page
backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    submitPage.style.display = "none";
    startPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display = "none";
    location.reload();
});

//clear scores
clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    addScore();
});