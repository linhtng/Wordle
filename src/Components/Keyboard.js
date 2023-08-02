import "../Styles/Keyboard.css"
import { KeyboardButton } from "./KeyboardButton";

export const Keyboard = ({fc, del}) => {

	const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const keys2 = ['a','s','d','f','g','h','i','j','k','l'];
	const keys3 = ['z','x','c','v','b','n','m', "DEL"];

	return (
		<>
			<div className="keyboard-line">
			{ keys1.map((key, i) => <KeyboardButton fc={fc} del={del} key={i} text={key} id={i}/>) }
			</div>
			<div className="keyboard-line">
			{ keys2.map((key, i) => <KeyboardButton fc={fc} del={del} key={i} text={key} id={i}/>) }
			</div>
			<div className="keyboard-line">
			{ keys3.map((key, i) => <KeyboardButton fc={fc} del={del} key={i} text={key} id={i}/>) }
			</div>

		</>
	)
}
