import "../Styles/Keyboard.css"

export const KeyboardButton = ({fc, del, text, id}) => {
	const handleClick = () => {
		fc(text);
	}
	if (id !== 7)
		return (
			<button className="sq" onClick={()=>handleClick(text)}>{text}</button>
		)
	else
		return (
			<button className="sq" onClick={()=>del()}>{text}</button>
		)
}
