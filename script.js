// Game Variables
let userName = "";
let roundNumber = 1;
let userWins = 0;
let computerWins = 0;
const choices = ["rock", "paper", "scissors"];

// Hearts Update
function updateHearts() {
    let userHeartDisplay = "";
    let computerHeartDisplay = "";

    for (let i = 0; i < 5; i++) {
        userHeartDisplay += (i < userWins) ? "♥ " : "♡ ";
        computerHeartDisplay += (i < computerWins) ? "♥ " : "♡ ";
    }

    document.getElementById("userHearts").innerHTML = userHeartDisplay.trim();
    document.getElementById("computerHearts").innerHTML = computerHeartDisplay.trim();
}

// Update Scoreboard
function updateScoreboard() {
    document.getElementById("roundText").textContent = "Round " + roundNumber + " of 5";
    updateHearts();
}

// End Game
function endGame() {
    let finalMessage = "";
    if (userWins > computerWins) finalMessage = `Congrats ${userName}! You won the game!`;
    else if (computerWins > userWins) finalMessage = `Sorry ${userName}. The computer won this time.`;
    else finalMessage = "It's a tie overall! Try again.";

    document.getElementById("resultMessage").textContent = finalMessage;
    document.getElementById("buttonsArea").style.display = "none";
    document.getElementById("resetBtn").classList.remove("d-none");
}

// Play One Round
function playRound(userChoice) {
    if (roundNumber > 5) return;

    let computerChoice = choices[Math.floor(Math.random() * 3)];

    document.getElementById("userChoiceText").textContent = userChoice;
    document.getElementById("computerChoiceText").textContent = computerChoice;

    let message = "";
    if (userChoice === computerChoice) message = "It's a tie!";
    else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userWins++;
        message = `You win! ${userChoice} beats ${computerChoice}.`;
    } else {
        computerWins++;
        message = `You lose! ${computerChoice} beats ${userChoice}.`;
    }

    document.getElementById("resultMessage").textContent = message;
    roundNumber++;
    updateScoreboard();

    if (roundNumber === 6) endGame();
}

// Reset Game
function resetGame() {
    roundNumber = 1;
    userWins = 0;
    computerWins = 0;
    document.getElementById("userChoiceText").textContent = "-";
    document.getElementById("computerChoiceText").textContent = "-";
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("buttonsArea").style.display = "block";
    document.getElementById("resetBtn").classList.add("d-none");
    updateScoreboard();
}

// Welcome Prompt
window.onload = function() {
    userName = prompt("Enter your name:") || "Player";
    document.getElementById("welcomeText").textContent = `Welcome, ${userName}!`;
    updateScoreboard();
};
