import "../Styles/Keyboard.css"
import { KeyboardButton } from "./KeyboardButton";
import { useEffect, useState } from "react";
import useEventListener from "@use-it/event-listener";

export const Keyboard = ({fc, del}) => {
	const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const keys2 = ['a','s','d','f','g','h','i','j','k','l'];
	const keys3 = ['z','x','c','v','b','n','m', "DEL"];

	const handleKeyUp = (event) => {
		const pressedKey = event.key.toLowerCase();
		if (/^[a-z]$/.test(pressedKey)) {
			fc(pressedKey);
		}
		else if (event.key === "Delete" || event.key === "Backspace") {
			fc("DEL");
		}
	}

	useEventListener("keyup", handleKeyUp);

	return (
		<>
			<div className="keyboard-line">
			{ keys1.map((key, i) => <KeyboardButton fc={fc} key={i} text={key} id={i}/>) }
			</div>
			<div className="keyboard-line">
			{ keys2.map((key, i) => <KeyboardButton fc={fc} key={i} text={key} id={i}/>) }
			</div>
			<div className="keyboard-line">
			{ keys3.map((key, i) => <KeyboardButton fc={fc} key={i} text={key} id={i}/>) }
			</div>
		</>
	)
}
