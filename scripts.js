//referencje do HTML-a

var newGameBtn = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//nasłuchiwacze

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//obiekty graczy

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


/************** USTAWIANIE PLANSZY *****************/

function setGameElements() {

  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

/******************* AKTUALIZACJA PUNKTÓW W HTML-U ********/

function setGamePoints() {

  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;

}

/******************** NOWA GRA *************************/

function newGame() {

  player.name = prompt('Proszę podać imię gracza', 'imię gracza');

  if(player.name) {

    player.score = 0;
    computer.score = 0;
    playerResultElem.innerHTML = "";
    computerResultElem.innerHTML = "";
    playerPickElem.innerHTML = "";
    computerPickElem.innerHTML = "";

    setGamePoints();

    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;

  }

}

/****************** LOSOWANIE WYBORU KOMPUTERA *******/

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}


/****************** PO WYBORZE GRACZA ****************/

function playerPick(playerPick) {

    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

/***************** ROZGRYWKA *************************/

function checkRoundWinner(playerPick, computerPick) {

    playerResultElem.innerHTML = "";
    computerResultElem.innerHTML = "";
    
    if (playerPick == computerPick) {
        computerResultElem.innerHTML = "Nikt nie zdobył punktu";
        playerResultElem.innerHTML = "Nikt nie zdobył punktu";

    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

          computerResultElem.innerHTML = "Zdobywa punkt";
          computer.score++;
          setGamePoints();

    } else {

          playerResultElem.innerHTML = "Zdobywa punkt";
          player.score++;
          setGamePoints();

    }

    if (player.score == 10) {
        alert('Wygrał gracz');
        end();
    } else if (computer.score == 10){
        alert('Wygrał komputer');
        end();
    }

}

/**************** KONIEC ROZGRYWKI *************/


function end(){
        gameState = 'ended';
        setGameElements();
}
