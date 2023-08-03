import "../Styles/grid.css"
import { useEffect, useState } from "react";
import { LineComponent } from "./LineComponent"
import {Keyboard} from "./Keyboard"
import { GameConfig } from "../GameConfig";
import { OutputComponent } from "./OutputComponent";
import { Message } from "./Message";
import file from "../words.txt";

export const Grid = () => {

	const [gameState, setGameState] = useState(null)
	const [currentLine, setCurrentLine] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [wordList, setWordList] = useState([]);
	const [randomWord, setRandomWord] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [won, setWon] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");

	const handleInput = (letter) => {
			if (letter === 'DEL')
				removeLetter();
			else
				addLetter(letter);
			if (showMessage && currentIndex  < 5)
				setShowMessage(false);
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
		if (currentIndex >= 5)
			setCurrentIndex(5)
	}

	const removeLetter = () => {
		const indexToRemove = currentIndex - 1;
		setGameState(gameState.map((line, n) => (
			line.map((item, i) => {
				if (indexToRemove === i && n === currentLine)
					return {...item, letter: ""}
				else
					return item;
			})
		)))
		if (currentIndex > 0)
			setCurrentIndex(currentIndex - 1);
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
						return {...item, color:"lightgrey"}
					else
						return item;
				}
				else
					return item;
			})
		)))
		setCurrentIndex(currentIndex + 1);
	}

	const checkGuess = (userGuess) => {
		let feedback = "";
		for (let i = 0; i < userGuess.length; i++) {
			if (userGuess[i] === randomWord[i])
				feedback += "O";
			else if (randomWord.includes(userGuess[i]))
				feedback += "X";
			else
				feedback += "-";
		}
		SetProperColor(feedback);
		if (userGuess === randomWord) {
			setWon(true);
			setGameOver(true);
		}
	}

	const checkWinningCondition = () => {
		if (currentIndex === 5)
		{
			let str = "";
			for (let i = 0; i < 5; i++)
				str += gameState[currentLine][i].letter
			if (isStringInList(str))
			{
				checkGuess(str);
				setCurrentIndex(0);
				setCurrentLine(currentLine + 1);
				if (currentLine >= 5)
				{
					setWon(false);
					setGameOver(true);
				}
			}
			else
			{
				setShowMessage(true)
				setMessage("Word not in word list");
			}
		}
	}

	const StartGame = () => {
		setCurrentIndex(0);
		setCurrentLine(0);
		setGameOver(false);
		setWon(false);
		getRandomWord(wordList);
		setGameState(GameConfig);
	}
	useEffect(()=> {
		StartGame();
	}, [])
	useEffect(() => {
		checkWinningCondition();
	}, [currentIndex])

	useEffect(()=> {
		setGameState(GameConfig);
		fetchWordList(file);
	}, [])

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
				{ showMessage && <Message message={message}/>}
			</div>
			{!gameOver && <Keyboard fc={handleInput} />}
			{gameOver && <OutputComponent string={randomWord} won={won}/>}
			{gameOver && <button id="PlayAgainButton" onClick={StartGame}>Play Again</button>}
		</>
	)
}
