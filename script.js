// Game Variables
let userName = "";
let roundNumber = 1;
let userWins = 0;
let computerWins = 0;
const maxRounds = 5;

const choices = ["rock", "paper", "scissors"];

// NEW: Valentine display names
const choiceNames = {
    rock: "Heart Gem 💎",
    paper: "Love Letter 💌",
    scissors: "Cupid’s Arrow 💘"
};

// NEW: Image paths
const choiceImages = {
    rock: "images/heart-gem.png",
    paper: "love-letter.png",
    scissors: "images/cupid-arrow.png"
};

// Hearts Update
function updateHearts() {
    let userHeartDisplay = "";
    let computerHeartDisplay = "";

    for (let i = 0; i < maxRounds; i++) {
        userHeartDisplay += (i < userWins) ? "♥ " : "♡ ";
        computerHeartDisplay += (i < computerWins) ? "♥ " : "♡ ";
    }

    document.getElementById("userHearts").textContent = userHeartDisplay.trim();
    document.getElementById("computerHearts").textContent = computerHeartDisplay.trim();
}

// Update Scoreboard
function updateScoreboard() {
    document.getElementById("roundText").textContent =
        "Round " + roundNumber + " of " + maxRounds;
    updateHearts();
}

// End Game
function endGame() {
    let finalMessage = "";
    if (userWins > computerWins)
        finalMessage = `Congrats ${userName}! You won the game! 💖`;
    else if (computerWins > userWins)
        finalMessage = `Sorry ${userName}. The computer won this time 💔`;
    else
        finalMessage = "It's a tie overall! 💗";

    document.getElementById("resultMessage").textContent = finalMessage;
    document.getElementById("buttonsArea").style.display = "none";
    document.getElementById("resetBtn").classList.remove("d-none");
}

// Play One Round
function playRound(userChoice) {
    if (roundNumber > maxRounds) return;

    // FIXED: no hardcoded 3
    let computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    // Update text (Valentine names)
    document.getElementById("userChoiceText").textContent =
        choiceNames[userChoice];
    document.getElementById("computerChoiceText").textContent =
        choiceNames[computerChoice];

    // NEW: Update images
    document.getElementById("userChoiceImg").src =
        choiceImages[userChoice];
    document.getElementById("computerChoiceImg").src =
        choiceImages[computerChoice];

    let message = "";

    if (userChoice === computerChoice) {
        message = "It's a tie! 💗";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userWins++;
        message = `You win! ${choiceNames[userChoice]} beats ${choiceNames[computerChoice]}. 💕`;
    } else {
        computerWins++;
        message = `You lose! ${choiceNames[computerChoice]} beats ${choiceNames[userChoice]}. 💔`;
    }

    document.getElementById("resultMessage").textContent = message;
    roundNumber++;
    updateScoreboard();

    if (roundNumber > maxRounds) endGame();
}

// Reset Game
function resetGame() {
    roundNumber = 1;
    userWins = 0;
    computerWins = 0;

    document.getElementById("userChoiceText").textContent = "-";
    document.getElementById("computerChoiceText").textContent = "-";
    document.getElementById("resultMessage").textContent = "";

    // NEW: Reset images
    document.getElementById("userChoiceImg").src = "images/placeholder.png";
    document.getElementById("computerChoiceImg").src = "images/placeholder.png";

    document.getElementById("buttonsArea").style.display = "block";
    document.getElementById("resetBtn").classList.add("d-none");

    updateScoreboard();
}

// Welcome Prompt
function startGame() {
    userName = document.getElementById("nameInput").value || "Player";

    document.getElementById("welcomeText").textContent =
        `Welcome, ${userName}! Let's play Rock, Paper, Scissors!`;

    document.getElementById("welcomeOverlay").style.display = "none";

    updateScoreboard();
}

 document.getElementById("nameInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        startGame();
    }
});
