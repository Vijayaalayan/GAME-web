var userName;
userName = prompt("what is your name");

// console.log(userName);
$("h1").prepend("Hey "+userName+", ");
// $("div").hide()
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var flag = 0;

// $("document").on("keypress",nextSequence());
// $("document").addEventListener("load", nextSequence());
$(document).keypress(function(){
    if(flag == 0){
        flag++;
        $("h1").text("Level "+level);
        nextSequence();
    }
    
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
        var wrong = "wrong";
        playSound(wrong);
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        startOver();
    }
}
function startOver(){
    flag = 0;
    level = 0;
    gamePattern =[];
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*6);
    randomNumber = randomNumber%4;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// nextSequence();

