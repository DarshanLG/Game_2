//To store the colors of the buttons.
var color = ["green", "red", "blue", "yellow"];

//To Store the pater of the color which is chosen randomly.
var pattern = [];

//To Store the pattern of colors chosen by user.
var userChosenPattern = [];

//To Know that the game has started.
var started = false;

//To Know the current  level of game.
var level = 0;


//Start's The Game.
$(document).keypress(function() {

  while (!started) {
    nextsequence();
    started = true;
  }
});


//TO Detect whena button is clicked upon by user.
$(".btn").click(function() {

  //TO get the ID of the color pressed by the user.
  var userClickedColor = $(this).attr("id");

  //To push this choosen colour to the list,
  userChosenPattern.push(userClickedColor);

  playSound(userClickedColor);

  animatePress(userClickedColor);

  checkAnswer(userChosenPattern.length - 1);
});


//This fucntion is used to check for user entered input wiht the system input.
function checkAnswer(currentlvl) {

  if (pattern[currentlvl] === userChosenPattern[currentlvl]) {
    console.log("Success!");
    if (userChosenPattern.length === pattern.length) {
      setTimeout(function() {
        nextsequence();
      }, 500);
    }
  } else {
    console.log("Failure!");
    wrong();
    restart();
  }
}


//To find out the next sequence of color that will be pickes randomly.
function nextsequence() {

  //Settign User clicked patter to null which help's us to replay for every level.
  userChosenPattern = [];

  level++;

  $("#level-title").text("Level : " + level);

  var num = Math.floor(Math.random() * 4);
  var randcolor = color[num];
  pattern.push(randcolor);

  $("#" + randcolor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randcolor);

}


//To play sound when a user presses on a button.
function playSound(name) {

  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();

}


//TO Add animation when a button is clicked.
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//If user gets the pattern wrong this function will be excuted.
function wrong() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press any key to restart the game");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}


//This function is to restart the game.
function restart() {
  level == 0;
  patern = [];
  started = false;
}
