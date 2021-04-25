// unordered list where the player's guessed letters will appear
const guessedLettersElem = document.querySelector(".guessed-letters"); 
// button with the text "Guess!"
const buttonGuess = document.querySelector("button.guess");
// text input where the player will guess a letter
const inputElem = document.querySelector("input.letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress"); 
// paragraph where the remaining guesses will display
const remainingElem = document.querySelector(".remaining"); 
// span inside the paragraph where the remaining guesses will display
const remainingSpan = document.querySelector(".remaining span");
// empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const buttonPlayAgain = document.querySelector("button.play-again");

let word = "magnolia";
let remainingGuesses = 8;
// array that holds the letters the user guessed
const guessedLetters = [];

const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    // pull random word from the wordArray & remove extra whitespace
    word = wordArray[randomIndex].trim();
    addSymbols(word);
};

getWord();

// Display symbols as letter placeholders
const addSymbols = function (word) {
    const symbols = [];
    for (const letter of word) {
        symbols.push("●");
    }
    wordInProgress.innerText = symbols.join("");
};

buttonGuess.addEventListener("click", function (e) {
    // prevents the default behavior of clicking a button, the form submitting, and then reloading the page
    e.preventDefault();
    // empty message paragraph
    message.innerText = "";
    // store user input as a string
    const userInput = inputElem.value;
    // make sure it is a single letter
    const goodGuess = validateInput(userInput);

    if (goodGuess) {
        makeGuess(goodGuess);
    }
    inputElem.value = "";
});

// validate user's input
const validateInput = function (input) {
    // a regular expression with the accepted letters sequence
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

// push guessed letters to the guessedLetters array
const makeGuess = function (guess) {
    // convert all letters to one casing
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        updateGuessedLetters();
        countGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};

// show guessed letters
const updateGuessedLetters = function () {
    guessedLettersElem.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElem.append(li);
    }
};

// replace symbols with guessed letters
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedWord = [];
    for (const item of wordArray) {
        if (guessedLetters.includes(item)) {
            updatedWord.push(item.toUpperCase());
        } else {
            updatedWord.push("●");
        }
    }
    wordInProgress.innerText = updatedWord.join("");
    checkWin();
};

const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    } else {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was "${word}".`;
        remainingSpan.innerText = "0 guesses";
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// check if player won
const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};