/*----- constants -----*/
const holidayWords = [
  "snow",
  "santa claus",
  "reindeer",
  "sleigh",
  "christmas tree",
  "decorations",
  "ornaments",
  "lights",
  "snowman",
  "stockings",
  "gifts",
  "presents",
  "chimney",
  "mistletoe",
  "holly",
  "wreath",
  "tinsel",
  "jingle bells",
  "caroling",
  "nativity",
  "bethlehem",
  "star",
  "wise men",
  "angels",
  "candle",
  "eggnog",
  "candy cane",
  "gingerbread",
  "nutcracker",
  "frosty",
  "winter wonderland",
  "joy",
  "peace",
  "love",
  "family",
  "friends",
  "festive",
  "celebrate",
  "traditions",
  "manger",
  "shepherds",
  "emmanuel",
  "yule log",
  "sled",
  "snowflakes",
  "icicles",
  "muffler",
  "poinsettia",
  "ribbon",
  "sack",
  "scented",
  "bells",
  "candles",
  "garlands",
  "greetings",
  "goodwill",
  "gratitude",
  "heartwarming",
  "hope",
  "kindness",
  "miracle",
  "nativity scene",
  "new year",
  "countdown",
  "fireworks",
  "champagne",
  "resolutions",
  "confetti",
  "midnight",
  "ball drop",
  "auld lang syne",
  "party",
  "toast",
  "january",
  "winter",
  "december",
  "frost",
  "warmth",
  "reflection",
  "snow globe",
  "mitten",
  "scarf",
  "cocoa",
  "sleigh ride",
  "ice skating",
  "snowball fight",
  "sugar plum",
  "fruitcake",
  "yuletide",
  "yummy",
  "cozy",
  "charity",
  "jovial",
  "starry night",
  "savor",
  "sip",
  "toast",
  "snowdrift",
  "solstice",
  "merry christmas!",
];

/*----- state variables -----*/

let selectedWord;
let guessedLetters;
let numberOfGuesses = 0;

/*----- functions -----*/
function initializeGame() {
  numberOfGuesses = 0;
  guessedLetters = [];
  // select random word from the array
  selectedWord = holidayWords[Math.floor(Math.random() * holidayWords.length)];
  //initialize array to store guessed letters
  for (let letter of selectedWord) {
    if (letter === " ") {
      guessedLetters.push("*");
    } else {
      guessedLetters.push("_");
    }
  }
  // Display the initial state of the word
  updateWordDisplay();
  displayResult(" ");
}

function guessLetter(button) {
  const guess = button.textContent.toLowerCase();

  if (selectedWord.includes(guess)) {
    // Update guessed letters and display
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        guessedLetters[i] = guess;
      }
    }
    // Check if the entire word has been guessed
    if (guessedLetters.join("") === selectedWord) {
      displayResult("Congratulations! You stayed dry!");
    }
  } else {
    numberOfGuesses++;
    if (numberOfGuesses > 5) {
      displayResult("You've been Dunked!");
    } else {
      // Incorrect letter guessed
      displayResult(
        `Incorrect Guess. you have ${6 - numberOfGuesses} guesses left!`
      );
    }
    // logic to track and display the dunk tank here
  }
  // Update the word display
  updateWordDisplay();
}

function updateWordDisplay() {
  const wordDisplayElement = document.getElementById("word-display");
  wordDisplayElement.textContent = guessedLetters.join(" ");
}

function displayResult(message) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = message;
}

// event listeners for keyboard buttons
document.querySelectorAll("keyboard").forEach((button) => {
  button.addEventListener("click", function () {
    guessLetter(this);
  });
});

// event listner for play again button
document.querySelector(".playAgain").addEventListener("click", function () {
  initializeGame();
});
// Last line of code
initializeGame();
