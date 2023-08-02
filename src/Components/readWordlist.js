import file from "../words.txt";
import "../Styles/letter_colors.css"

// Function to read and parse the content of "words.txt"
function fetchWordList(callback) {
    fetch(file)
        .then(response => response.text())
        .then(wordListText => {
            const wordList = wordListText.split('\n').map(word => word.trim());
            callback(wordList);
        })
        .catch(error => {
            console.error("Error fetching word list:", error);
        });
}

// Function to randomly select a word from the word list
function getRandomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Usage:
fetchWordList(function (wordList) {
    // Now you have the parsed array 'wordList' containing all the words
    // You can randomly select a word from 'wordList' using the getRandomWord function
    console.log("wordlLst: " + wordList)
    const randomWord = getRandomWord(wordList);
    console.log("Randomly selected word:", randomWord);
    // Usage example:
    const userGuess = "ample"; // Replace this with the actual user's guess
    checkGuess(userGuess, randomWord);
});

// Function to check the user's guess against the target word
function checkGuess(userGuess, targetWord) {
    if (userGuess === targetWord) {
        // Correct guess: The user wins the game
        console.log("Congratulations! You guessed the word correctly!");
        // Add any code to display a winning message and handle game end
    } else {
        // Incorrect guess: Provide feedback on each letter
        let feedback = "";
        for (let i = 0; i < userGuess.length; i++) {
            if (userGuess[i] === targetWord[i]) {
                // Right letter, right place (turn green)
                feedback += `<span class="correct">${userGuess[i]}</span>`;
                //feedback += "O";
            } else if (targetWord.includes(userGuess[i])) {
                // Right letter, wrong place (turn yellow)
                feedback += `<span class="right-place">${userGuess[i]}</span>`;
                //feedback += "X";
            } else {
                // Wrong letter (turn grey)
                feedback += `<span class="incorrect">${userGuess[i]}</span>`;
                //feedback += "-";
            }
        }

        console.log("Feedback:", feedback);
        // Display feedback to the user to indicate correctness of each letter
        // Add any code to handle incorrect guess or display feedback in the UI
    }
}

export default fetchWordList
