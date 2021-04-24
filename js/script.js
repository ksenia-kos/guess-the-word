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

const word = "magnolia";
// array that holds all the letters the user guesses
const guessedLetters = [];

// Display symbols as letter placeholders
const addSymbols = function (word) {
    const symbols = [];
    for (let letter of word) {
        symbols.push("●");
    }
    wordInProgress.innerText = symbols.join("");
}

addSymbols(word);

// create an array of characters
// const characters = word.split('');

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

// check user's input
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

// pushes guessed letters to the array
const makeGuess = function (guess) {
    // convert all letters to one casing
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
