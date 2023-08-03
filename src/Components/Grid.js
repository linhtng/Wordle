import "../Styles/grid.css"
import { useEffect, useState } from "react";
import { LineComponent } from "./LineComponent"
import {Keyboard} from "./Keyboard"
import { GameConfig } from "../GameConfig";
import file from "../words.txt";

export const Grid = () => {

	const [gameState, setGameState] = useState(null)
	const [currentLine, setCurrentLine] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [wordList, setWordList] = useState([]);
	const [randomWord, setRandomWord] = useState("");
	const [gameOver, setGameOver] = useState(false);

	const handleInput = (letter) => {
			addLetter(letter);
	}

	const addLetter = (letter) => {
		setGameState(gameState.map((line, n) => (
			line.map((item, i) => {
				if (currentIndex === i && n === currentLine)
					return {...item, letter}
				else
					return item;
			})
		)))
		setCurrentIndex(currentIndex + 1);
	}

	const removeLetter = () => {
		setGameState(gameState.map((line, n) => (
			line.map((item, i) => {
				if (currentIndex === i && n === currentLine)
					return {...item, letter:" "}
				else
					return item;
			})
		)))
		setCurrentIndex(currentIndex - 1);
		if (currentIndex < 0)
			setCurrentIndex(0);
		
	}

	const getRandomWord = (list) => {
		const randomIndex = Math.floor(Math.random() * wordList.length);
		setRandomWord(list[randomIndex]);
	}

	const fetchWordList = (file) => {
		fetch(file)
			.then(response => response.text())
			.then(wordListText => {
				const list = wordListText.split('\n').map(word => word.trim());
				setWordList(list);
				getRandomWord(list);
			})
			.catch(error => {
				console.error("Error fetching word list:", error);
			});
	}


	const isStringInList = (userGuess) => {
		if (wordList.includes(userGuess))
			return true;
		return false;
	}

	const SetProperColor = (feedback) => {
		console.log("set color started")
		setGameState(gameState.map((line, n) => (
			line.map((item, i) => {
				if (n === currentLine)
				{
					console.log(`feedback${i}: ${feedback[i]}`);
					if (feedback[i] === "X") 
						return {...item, color:"yellow"}
					else if (feedback[i] === "O")
						return {...item, color:"green"}
					else if (feedback[i] === "-")
						return {...item, color:"grey"}
					else
					{
						console.log("here");
						return item;
					}
				}
				else
					return item;
			})
		)))
		setCurrentIndex(currentIndex + 1);
	}

	const checkGuess = (userGuess) => {
		if (userGuess === randomWord) {
			// Correct guess: The user wins the game
			console.log("Congratulations! You guessed the word correctly!");
			// Add any code to display a winning message and handle game end
		} else {
			// Incorrect guess: Provide feedback on each letter
			let feedback = "";
			for (let i = 0; i < userGuess.length; i++) {
				if (userGuess[i] === randomWord[i]) {
					// Right letter, right place (turn green)
					//feedback += `<span class="correct">${userGuess[i]}</span>`;
					feedback += "O";
				} else if (randomWord.includes(userGuess[i])) {
					// Right letter, wrong place (turn yellow)
					//feedback += `<span class="right-place">${userGuess[i]}</span>`;
					feedback += "X";
				} else {
					// Wrong letter (turn grey)
					//feedback += `<span class="incorrect">${userGuess[i]}</span>`;
					feedback += "-";
				}
			}
			console.log("Feedback:", feedback);
			// Display feedback to the user to indicate correctness of each letter
			// Add any code to handle incorrect guess or display feedback in the UI
			SetProperColor(feedback);
		}
	}

	const checkWinningCondition = () => {
		if (currentIndex === 5)
		{
			let str = "";
			for (let i = 0; i < 5; i++)
				str += gameState[currentLine][i].letter
			console.log(`string: ${str}`);
			if (isStringInList(str))
			{
				console.log("valid string")
				checkGuess(str);
				setCurrentIndex(0);
				setCurrentLine(currentLine + 1);
				if (currentLine >= 5)
					setGameOver(true);
			}
			else
				console.log("string not on the list");
		}
	}

	useEffect(() => {
		checkWinningCondition();
	}, [currentIndex])

	useEffect(()=> {
		setGameState(GameConfig);
		fetchWordList(file);
	}, [wordList.length])

	if (!gameState || wordList.length === 0)
		return <div>loading</div>
	else
	return (
		<>
			<div className="grid-div">
			{
				gameState.map((line, i) =>
					<LineComponent
						currentIndex={currentIndex}
						key = {i}
						line={line}
					/>
				)
			}
			</div>
			{!gameOver && <Keyboard fc={handleInput} del={removeLetter}/>}
			{gameOver && <div>Game is over</div>}
		</>
	)
}
