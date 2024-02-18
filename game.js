const colorArr=["red", "blue", "green", "yellow"];
const redSound = new Audio("sounds/red.mp3");
const greenSound = new Audio("sounds/green.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

let gamePattern = [];
let userClickedPattern=[];
let level = 0;
var started = false;

$('body').keydown(function(event){
    $('#level-title').text("Level "+level);
    started = true;
    nextSeq();
});

$(".container").on("tap",function(){
  $('#level-title').text("Level "+level);
    started = true;
    nextSeq();
});

$(".btn").click(function(event){
    var chosenColour = $(this).attr("id");
    userClickedPattern.push(chosenColour);
    animatePress(chosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSeq();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSeq() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = colorArr[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

function animatePress(currColor){
    $("#"+currColor).addClass("pressed");
    playSound(currColor);
    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  

function playSound(chosenColour){
    switch (chosenColour) {
        case 'red':
            redSound.play();
            break;
        case 'green':
            greenSound.play();
            break;
        case 'blue':
            blueSound.play();
            break;
        case 'yellow':
            yellowSound.play();
            break;
        default:
            break;
    }
}
