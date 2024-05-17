var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;

var level = 0;

$("h1").click(function() {

    if (!gameStarted) {
        $("h2").remove();
        $("#level-title").text("Nivel " + level);
        nextSequence();
        gameStarted = true; 
    }
})

$(document).keypress(function() {
    
    if (!gameStarted) {
        $("h2").remove();
        $("#level-title").text("Nivel " + level);
        nextSequence();
        gameStarted = true; 
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

     if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
      }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over :(... Presiona cualquier tecla para comenzar")
        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Nivel " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function startOver() {

    level = 0;
    gamePattern = [];
    gameStarted = false;

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    
    $("#" + currentColour).addClass("pressed"); 

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);
}










