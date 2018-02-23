function playRound(playerSelectedNode, computerNode, scoreNode) {
    let computerSelection = playComputer();
    let playerSelection = getPlayerSelection(playerSelectedNode).toLowerCase().trim();

    //highlight player selection, computer selection and score. if the player wins, make the container transition to green bg. loses: red, draw: yellow
    console.log(playerSelectedNode);
    playerSelectedNode.classList.add("selected");

    setTimeout(function() {
        let selectionPictures = {
            "rock" : "img/rock_fb.png",
            "paper": "img/paper_fb.png",
            "scissors": "img/scissors_fb.png"
        }
        computerNode.classList.add("selected");
        setTimeout (function() {computerNode.style.backgroundImage = "url(" + selectionPictures[computerSelection] + ")";
            setTimeout(function() {updateScore(result, scoreNode);}, 200)
        }, 400)     
    },200);


    let result = "";
    if (playerSelection == computerSelection) {
        result = "tie";
    }
    else if (playerSelection == "rock") {
        result = computerSelection == "scissors" ? "won" : "lost";
    }
    else if (playerSelection == "paper") {
        result = computerSelection == "rock" ? "won" : "lost";
    }
    else if (playerSelection == "scissors") {
        result = computerSelection == "paper" ? "won" : "lost";
    }
    else {
        throw "unknown combination";
    }

    setTimeout(function() {resetPlayground(playerSelectedNode, computerNode)}, 2000);


}

function resetPlayground(playerNode, computerNode) {
    playerNode.classList.remove("selected");
    computerNode.style.backgroundImage = "none";
    computerNode.classList.remove("selected");
}

function lockOptions(lock) {
    if (lock) {

    }
}

function updateScore(result, scoreNode) {
    let score = result === "won" ? 1 : result == "lost" ? -1 : 0;

    let colorWarning = ["#af2b2b", "#b7a643", "#379b30"];
    let mainContainer = document.querySelector(".main");
    mainContainer.style.backgroundColor = colorWarning[score+1];
    setTimeout(function() {mainContainer.style.backgroundColor = "";},400)

    let currentTotalScore = 0;
    let newScore = 0;
    if (parseInt(scoreNode.textContent)) {
        currentTotalScore = parseInt(scoreNode.textContent);
        newScore = currentTotalScore + score;
    }

    else {
        newScore = score;
    }

    scoreNode.textContent = newScore;
}



function playComputer() {
    //array of bgimages. here or global?
    let selection = Math.floor((Math.random()*3))+1;
    switch (selection) {
        case 1:
            return "rock";
            break;
        case 2:
            return "paper";
            break;
        case 3:
            return "scissors";
            break;
        default:
            throw "computer selection is not recognized!";
            break;
    }
}

function initialize(){
    let choices = document.querySelectorAll("#rock, #paper, #scissors");
    let computerNode = document.getElementById("computerSelection");
    score = document.getElementById("score");

    for (let i = 0; i < choices.length; i++) {
        choices[i].addEventListener("click", function(e) {playRound(e.target, computerNode, score)});
    }
}



function getPlayerSelection(domNode) {
    console.log(domNode);
    let selection = domNode.getAttribute("id");

    if(checkPlayerInput(selection)) {
        return selection;
    }
    else
    { throw "player input is not recognized!"; }
}


function gameOld() {
    let rounds = Number(prompt("How many rounds will you play?", "3"));
    while (!rounds) {
        rounds = Number(prompt("Enter a number.", "3"));
    }

    let playerScore = 0;

    for (let i = 0; i < rounds; i++) {
        let playerSelection = prompt("Rock, paper, or scissors?","");
        while (!checkPlayerInput(playerSelection)) {
            playerSelection = prompt("Invalid selection. Please pick either rock, paper or scissors.","");
        }

        let computerSelection = playComputer();

        let result = playRound(playerSelection, computerSelection);
        if (result == "won") {
            playerScore++;
        }
        else if (result == "lost") {
            playerScore--;
        }
        else if (result == "tie") {

        }
        else {
            alert("Something bad happened. " + result);
            i--;
            continue;
        }

        alert(playerSelection + " " + result + " against " + computerSelection + "!\n Score:" + playerScore);

    }

    alert("Your score is " + playerScore + "! You " + (playerScore > 0 ? "won!" : playerScore == 0 ? "are tied with the computer!" : "lost.") );
}

function checkPlayerInput(input) {
    let validInputs = ["rock", "paper", "scissors"];
    return input !== null && validInputs.indexOf(input.toLowerCase().trim()) != -1 ? true : false;
}


window.onload = initialize;