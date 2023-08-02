import file from "../words.txt";

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
    // Proceed with your Wordle game logic here
});

const getWordlist = {fetchWordList, getRandomWord}
export default getWordlist
