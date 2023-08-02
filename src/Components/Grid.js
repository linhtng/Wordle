import "../Styles/grid.css"
import { useEffect, useState } from "react";
import { LineComponent } from "./LineComponent"
import {Keyboard} from "./Keyboard"
import { GameConfig } from "../GameConfig";


export const Grid = () => {

	const [gameState, setGameState] = useState(null)
	const [currentLine, setCurrentLine] = useState(0);
	const [currentLetter, setCurrentLetter] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const increaseIndex = () => setCurrentIndex(currentIndex++);
	const decreaseIndex = () => setCurrentIndex(currentIndex--);

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
		if (currentIndex >= 5)
		{
			setCurrentIndex(0);
			setCurrentLine(currentLine + 1);
		}
	}

	const removeLetter = () => {
		if (currentIndex === 0)
			return ;
		setGameState(gameState.map((line, n) => (
			line.map((item, i) => {
				if (currentIndex === i && n === currentLine)
					return {...item, letter:" "}
				else
					return item;
			})
		)))
		setCurrentIndex(currentIndex - 1);
	}

	useEffect(()=> {
		setGameState(GameConfig);
	}, [])

	if (!gameState)
		return <div>loading</div>
	else
	return (
		<>
			<div className="grid-div">
			{
				gameState.map((line, i) =>
					<LineComponent
						currentIndex={currentIndex}
						increaseIndex={increaseIndex}
						decreaseIndex={decreaseIndex}
						key = {i}
						line={line}
					/>
				)
			}
			</div>
			<Keyboard fc={handleInput} del={removeLetter}/>
		</>
	)
}
