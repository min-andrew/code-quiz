// timer application
// things to do :
// 1. minus seconds if you answer incorrectly
// 2. start timer app when quiz gets pressed 

var timerEl = document.getElementById('timer');

function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Timer: " + timeLeft;

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            // Calls function to create and append image
            // displayMessage();
        }
    }, 1000);
}
countdown();


// quiz application 
var startQuiz = document.getElementById("#start")

startQuiz.addEventListener("click",)

// your score application

