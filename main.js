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

const originalStickManPosition = "-5px"
/*----- state variables -----*/
let selectedWord;
let guessedLetters;
let numberOfGuesses = 0;

/*----- functions -----*/
function resetStickMan() {
  stickMan.style.marginTop = originalStickManPosition;
}

function initializeGame() {
  numberOfGuesses = 0;
  guessedLetters = [];
  resetStickMan()
  // select random word from the array of holidayWords
  selectedWord = holidayWords[Math.floor(Math.random() * holidayWords.length)];
  //initialize array to store correctly guessed letters
  for (let letter of selectedWord) {
    if (letter === " ") {
      guessedLetters.push("*");
    } else {
      guessedLetters.push("_");
    }
  }
  // Display the initial state of the word - number of letters to be guessed and * to signify space between words 
  updateWordDisplay();
  displayResult(" ");
}
const stickMan = document.querySelector(".stickMan") 

function guessLetter(button) {
  const guess = button.textContent.toLowerCase();

  if (selectedWord.includes(guess)) {
    // Update guessed letters and word display
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        guessedLetters[i] = guess;
      }
    }
    // Check if the entire word has been guessed correctly
    if (guessedLetters.join("").replace("*"," ") === selectedWord) {
      displayResult("Congratulations! You stayed dry!");
    }
  } else {
    numberOfGuesses++;
    if (numberOfGuesses > 5) {
      stickMan.style.marginTop = (28 * (numberOfGuesses + 1)) + "px"
      displayResult("You've been dunked!");
    } else {
      // Incorrect letter guessed
      const remainingGuesses = 6 - numberOfGuesses;
      const guessesLeftMessage = remainingGuesses === 1 
        ? "Incorrect guess, you have 1 guess left!"
        : `Incorrect guess, you have ${remainingGuesses} guesses left!`
      displayResult(guessesLeftMessage);
      updateStickMan(numberOfGuesses); 
    }
  }
  // Update the word display
  updateWordDisplay();
}

function updateStickMan(step) {
  stickMan.style.marginTop = (28 * step) + "px"
}
  
function updateWordDisplay() {
  const wordDisplayElement = document.getElementById("word-display");
  wordDisplayElement.textContent = guessedLetters.join(" ");
}

function displayResult(message) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = message;

  if (message === "You've been dunked!") {
    const correctWordElement = document.getElementById("result");
   const newElement = document.createElement("div")
   
    newElement.innerText = `The correct word was: ${selectedWord}`;
    
    resultElement.appendChild(newElement)

    setTimeout(() => {
      initializeGame();
    }, 4000);
    return
  } else {
    const correctWordElement = document.getElementById("result");
    correctWordElement.textContent = " ";
  }
  resultElement.textContent = message;
}
// event listeners for keyboard buttons
document.querySelectorAll("keyboard").forEach((button) => {
  button.addEventListener("click", function () {
    guessLetter(this);
  });
});
// event listener for play again button
document.querySelector(".playAgain").addEventListener("click", function () {
  initializeGame();
});
// Last line of code
initializeGame();
