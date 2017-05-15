var playerOne = null;
var playerTwo = null;
var currentPlayer = null;
var currentRoundScores = [];

function player(name) {
  this.name = name;
  this.score = 0;

}

function getCurrentRoundScore() {
  var total = 0;

  currentRoundScores.forEach(function(score){
    total += score;
  });
  return total;
}
function updatePlayerScores (){
  updateTextOnPage("#player-one-score", playerOne.score);
  updateTextOnPage("#player-two-score", playerTwo.score);
}
function updateRoundScore() {
  $("#current-round-score").text(getCurrentRoundScore())

}
function getRndomPlayer(playerOne, playerTwo) {
  var players = [playerOne, playerTwo]
  return players[Math.round(Math.random)]

}
function switchCurrentPlayer() {
if (currentPlayer === playerOne) {
  currentPlayer = playerTwo;
} else {
  currentPlayer = playerOne;
}
  $(#current-player).text(currentPlayer.name);
  currentRoundScores = []
  updateRoundScore();
  disableEndTurnbtn();
}
function setMessage(message) {
  $("#message").text(message);

}
function clearMessage() {
  setMessage("")

}
function updateTextOnPage(selector, tetx) {
  $(selector).text(text)  ;
}
function resetGme() {
  playerOne.score = 0;
  playerTwo.score = 0;
  updatePlayerScores();

  currentPlayer = getRndomPlayer(playerOne, playerTwo);
  setMessage("This is a new game" + currentPlayer.name + " will begin ");
}
function disableHoldbtn() {
  $("#hold").prop('disable', true)

}
function enableHoldBtn() {
  $("#hold").prop('disable', false)
}
function updateBackground(url) {
   $("body").css({"background": "url('./images/" + url + "')", "background-size": "100% 100%"});
}
function rolledOne() {
  switchCurrentPlayer();
  setMessage("Snap! You rolled a 1, you lose your points and your turn is over. It's your turn, " + currentPlayer.name + "!");
  disableHoldBtn();
  setRandomFailBackground();
  $("#dice-image").effect("shake", {times: 8}, 800);
}
function setRandomFailBackground() {
  var failImages = ["1.gif", "2.gif"];
  updateBackground(failImages[Math.floor(Math.random() * failImages.length)]);
}

$(function() {
  disableHoldBtn();

  $(".dice-result-wrapper *").hide();

  var diceImage = $("#dice-image");


  $("form#add-players").submit(function(event) {
    event.preventDefault();

    var playerOneName = $("#player-one-name").val();
    var playerTwoName = $("#player-two-name").val();

    playerOne = new Player(playerOneName);
    playerTwo = new Player(playerTwoName);

    updateTextOnPage(".player-1-name", playerOne.name + "'s score: ");
    updateTextOnPage(".player-2-name", playerTwo.name + "'s score: ");

    $(this).parent().hide();
    $("#show-game").show();

    currentPlayer = getRandomPlayer(playerOne, playerTwo);

    $("#current-player").text(currentPlayer.name);

    setMessage(currentPlayer.name + " was randomly selected to go first.");
  });

  $("#roll-dice").click(function() {
    updateBackground("");
    clearMessage();
    enableHoldBtn();

    var diceResult = Math.floor(Math.random() * (6)) + 1;

    currentRoundScores.push(diceResult);

    $("#current-round-score").text(getCurrentRoundScore());

    diceImage.removeClass().addClass("dice");

    if (diceResult === 1) {
      diceImage.addClass("dice-one");
      rolledOne();
    } else if (diceResult === 2) {
      diceImage.addClass("dice-two");
    } else if (diceResult === 3) {
      diceImage.addClass("dice-three");
    } else if (diceResult === 4) {
      diceImage.addClass("dice-four");
    } else if (diceResult === 5) {
      diceImage.addClass("dice-five");
    } else if (diceResult === 6) {
      diceImage.addClass("dice-six");
    }

    $(".dice-result-wrapper *").show();
  });

  $("#hold").click(function() {
    setMessage("Nice work! " + currentPlayer.name + " just gained " +
      getCurrentRoundScore() + " points.");
    currentPlayer.score += getCurrentRoundScore();

    updatePlayerScores();

    $(".dice-result-wrapper *").hide();

    if (currentPlayer.score >= 100) {
      setMessage("Congratulations " + currentPlayer.name + "! You win!");
      $("#message").append("<span class='clear-scores linkify'> Click here to play again!</span>");

      updateBackground("success1.gif");

      $(".clear-scores").click(function() {
        resetGame();
      });
    }
    switchCurrentPlayer();
  });

});
