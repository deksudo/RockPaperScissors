function playRound(playerSelection, computerSelection) {
	playerSelection = playerSelection.toLowerCase().trim();

	if (playerSelection == computerSelection) {
		return "tie";
	}
	else if (playerSelection == "rock") {
		return computerSelection == "scissors" ? "won" : "lost";
	}
	else if (playerSelection == "paper") {
		return computerSelection == "rock" ? "won" : "lost";
	}
	else if (playerSelection == "scissors") {
		return computerSelection == "paper" ? "won" : "lost";
	}
	else {
		return "unknown combination";
	}

}

function playComputer() {
	let selection = Math.floor((Math.random()*3)+1);
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
			return "error: check random number generation.";
			break;
	}
}

function game() {
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

game();