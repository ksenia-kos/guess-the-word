// unordered list where the player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters"); 
// button with the text "Guess!"
const buttonGuess = document.querySelector("button.guess");
// text input where the player will guess a letter
const input = document.querySelector("input.letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress"); 
// paragraph where the remaining guesses will display
const remain = document.querySelector(".remaining"); 
// span inside the paragraph where the remaining guesses will display
const remainGuesses = document.querySelector(".remaining span");
// empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const buttonPlayAgain = document.querySelector("button.play-again");

const word = "magnolia";
//console.log(word.split(''));

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
    e.preventDefault();
    const userInput = input.value;
    console.log(userInput);
    input.value = "";
});