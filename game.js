var userClickedPattern = [];//stores user clicked pattern

var gamePattern = []; //Stores randomly generated computer pattern

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false; //To check if the game has been started

var level = 0; // stores current level


function nextSequence() {

    //Reset user clicked pattern array for every level
    userClickedPattern = [];
    //Update level
    level++;
    $("#level-title").text("Level " + level);

    //Generate color pattern
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Animate button when clicked
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    //Play sound when button is clicked
    playSound(randomChosenColor);
}

//To identify user clicked button 
$(".btn").on("click", function (event) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    //Play specific sound for the clicked button
    playSound(userChosenColor);

    //Play a common animation for the user to acknowledge a click
    animatePress(userChosenColor);

    //Checking if the user clicked button/sequence is matching with the computer generated pattern
    checkAnswer(userClickedPattern.length - 1);
})

//To play specific sound of a button
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

//To animate buttons when clicked
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//To start the game with any keypress
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//Check if both the generated patterns are same
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
